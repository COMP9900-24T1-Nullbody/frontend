import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Collapse } from "@mui/material";
import TopIndicator from "./TopIndicator.jsx";
import SubIndicator from "./SubIndicator.jsx";

export default function MetricsOptions({ data, setData }) {
  const [openTopIndicators, setOpenTopIndicators] = useState({});

  const handleTopCheckBoxClick = (topIndicator) => {
    const currentStatus = getCurrentStatus(topIndicator);

    const updatedData = data.map((topIndicatorItem) => {
      if (topIndicatorItem.name === topIndicator) {
        const updatedSubIndicators = topIndicatorItem.metrics.map(
          (subIndicatorItem) => ({
            ...subIndicatorItem,
            checked:
              currentStatus === "intermediate"
                ? true
                : !subIndicatorItem.checked,
          })
        );
        return {
          ...topIndicatorItem,
          metrics: updatedSubIndicators,
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
      [topIndicator]: isOpen,
    });
  };

  const getCurrentStatus = (topIndicator) => {
    const topIndicatorItem = data.find((item) => item.name === topIndicator);
    const allChecked = topIndicatorItem.metrics.every(
      (subIndicatorItem) => subIndicatorItem.checked
    );
    const allUnchecked = topIndicatorItem.metrics.every(
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
      if (topIndicatorItem.name === topIndicator) {
        const updatedSubIndicators = topIndicatorItem.metrics.map(
          (subIndicatorItem) => {
            if (subIndicatorItem.name === subIndicator) {
              return {
                ...subIndicatorItem,
                checked: !subIndicatorItem.checked,
              };
            }
            return subIndicatorItem;
          }
        );
        return {
          ...topIndicatorItem,
          metrics: updatedSubIndicators,
        };
      }
      return topIndicatorItem;
    });
    setData(updatedData);
  };

  return (
    <Box>
      {data.map((RiskItem, index) => (
        <Box key={index}>
          {RiskItem.indicators.map((topIndicatorItem, index) => (
            <Box key={index}>
              <TopIndicator
                topIndicatorItem={topIndicatorItem}
                open={openTopIndicators[topIndicatorItem.name] || false}
                onTopIndicatorClick={handleTopIndicatorClick}
                onTopCheckBoxClick={handleTopCheckBoxClick}
                onWeightSave={(newWeight) => {
                  // Update the data with the new weight
                  const updatedData = data.map((item) => {
                    if (item.name === topIndicatorItem.name) {
                      return {
                        ...item,
                        weight: newWeight,
                      };
                    }
                    return item;
                  });
                  setData(updatedData);
                }}
              />
              <Collapse
                in={openTopIndicators[topIndicatorItem.name]}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ pl: 2, pr: 2 }}>
                  {topIndicatorItem.metrics.map(
                    (subIndicatorItem, subIndicatorIndex) => (
                      <SubIndicator
                        key={subIndicatorIndex}
                        subIndicatorItem={subIndicatorItem}
                        onSubIndicatorClick={(subIndicator) =>
                          handleSubIndicatorClick(
                            topIndicatorItem.name,
                            subIndicator
                          )
                        }
                        onWeightSave={(newWeight) => {
                          // 更新数据中的子指示器权重
                          const updatedData = data.map((item) => {
                            // 找到匹配的顶级指示器
                            if (topIndicatorItem.name === item.name) {
                              // 更新子指示器权重
                              const updatedSubIndicators =
                                topIndicatorItem.metrics.map((subitem) => {
                                  // 找到匹配的子指示器
                                  if (subIndicatorItem.name === subitem.name) {
                                    return {
                                      ...subitem,
                                      weight: newWeight,
                                    };
                                  }
                                  return subitem;
                                });
                              // 返回更新后的顶级指示器
                              return {
                                ...item,
                                metrics: updatedSubIndicators,
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
      ))}
    </Box>
  );
}

MetricsOptions.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};
