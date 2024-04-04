import React, { useEffect, useState } from "react";
import { Box, Collapse } from "@mui/material";
import TopIndicator from "./TopIndicator.jsx";
import SubIndicator from "./SubIndicator.jsx";

import sample_data from "./sample_data.json";

export default function NestedCheckbox() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(sample_data);
  }, []);

  const [openTopIndicators, setOpenTopIndicators] = useState({});

  const handleTopCheckBoxClick = (topIndicator) => {
    const currentStatus = getCurrentStatus(topIndicator);

    const updatedData = data.map((topIndicatorItem) => {
      if (topIndicatorItem.topIndicator === topIndicator) {
        const updatedSubIndicators = topIndicatorItem.subIndicators.map(
          (subIndicatorItem) => ({
            ...subIndicatorItem,
            checked:
              currentStatus === "intermediate"
                ? true
                : !subIndicatorItem.checked
          })
        );
        return {
          ...topIndicatorItem,
          subIndicators: updatedSubIndicators
        };
      }
      return topIndicatorItem;
    });

    setData(updatedData);
  };

  const handleTopIndicatorClick = (topIndicator) => {
    const isOpen = !openTopIndicators[topIndicator];
    setOpenTopIndicators({
      ...openTopIndicators,
      [topIndicator]: isOpen
    });
  };

  const getCurrentStatus = (topIndicator) => {
    const topIndicatorItem = data.find(
      (item) => item.topIndicator === topIndicator
    );
    const allChecked = topIndicatorItem.subIndicators.every(
      (subIndicatorItem) => subIndicatorItem.checked
    );
    const allUnchecked = topIndicatorItem.subIndicators.every(
      (subIndicatorItem) => !subIndicatorItem.checked
    );

    if (allChecked) {
      return "checked";
    } else if (allUnchecked) {
      return "unchecked";
    } else {
      return "intermediate";
    }
  };

  const handleSubIndicatorClick = (topIndicator, subIndicator) => {
    const updatedData = data.map((topIndicatorItem) => {
      if (topIndicatorItem.topIndicator === topIndicator) {
        const updatedSubIndicators = topIndicatorItem.subIndicators.map(
          (subIndicatorItem) => {
            if (subIndicatorItem.subIndicator === subIndicator) {
              return {
                ...subIndicatorItem,
                checked: !subIndicatorItem.checked
              };
            }
            return subIndicatorItem;
          }
        );
        return {
          ...topIndicatorItem,
          subIndicators: updatedSubIndicators
        };
      }
      return topIndicatorItem;
    });
    setData(updatedData);
  };

  return (
    <Box>
      {data.map((topIndicatorItem, index) => (
        <Box key={index}>
          <TopIndicator
            topIndicatorItem={topIndicatorItem}
            open={openTopIndicators[topIndicatorItem.topIndicator] || false}
            onTopIndicatorClick={handleTopIndicatorClick}
            onTopCheckBoxClick={handleTopCheckBoxClick}
            onWeightSave={(newWeight) => {
              // Update the data with the new weight
              const updatedData = data.map((item) => {
                if (item.topIndicator === topIndicatorItem.topIndicator) {
                  return {
                    ...item,
                    weight: newWeight
                  };
                }
                return item;
              });
              setData(updatedData);
            }}
          />
          <Collapse
            in={openTopIndicators[topIndicatorItem.topIndicator]}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ pl: 2, pr: 2 }}>
              {topIndicatorItem.subIndicators.map(
                (subIndicatorItem, subIndicatorIndex) => (
                  <SubIndicator
                    key={subIndicatorIndex}
                    subIndicatorItem={subIndicatorItem}
                    onSubIndicatorClick={(subIndicator) =>
                      handleSubIndicatorClick(
                        topIndicatorItem.topIndicator,
                        subIndicator
                      )
                    }
                    onWeightSave={(newWeight) => {
                      // 更新数据中的子指示器权重
                      const updatedData = data.map((item) => {
                        // 找到匹配的顶级指示器
                        if (
                          topIndicatorItem.topIndicator === item.topIndicator
                        ) {
                          // 更新子指示器权重
                          const updatedSubIndicators =
                            topIndicatorItem.subIndicators.map((subitem) => {
                              // 找到匹配的子指示器
                              if (
                                subIndicatorItem.subIndicator ===
                                subitem.subIndicator
                              ) {
                                return {
                                  ...subitem,
                                  weight: newWeight
                                };
                              }
                              return subitem;
                            });
                          // 返回更新后的顶级指示器
                          return {
                            ...item,
                            subIndicators: updatedSubIndicators
                          };
                        }
                        return item;
                      });
                      // 将更新后的数据保存到父组件中
                      setData(updatedData);
                    }}
                  />
                )
              )}
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
}
