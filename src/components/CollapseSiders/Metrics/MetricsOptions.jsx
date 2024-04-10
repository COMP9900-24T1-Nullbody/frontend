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
                    if (RiskItem === item) {
                      const updatedTopIndicators = item.indicators.map(
                        (topitem) => {
                          if (topIndicatorItem === topitem) {
                            return {
                              ...topitem,
                              weight: newWeight,
                            };
                          }
                          return topitem;
                        }
                      );
                      return {
                        ...item,
                        indicators: updatedTopIndicators,
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
                          const updatedData = data.map((item) => {
                            if (RiskItem === item) {
                              const updatedTopIndicators = item.indicators.map(
                                (topitem) => {
                                  if (topIndicatorItem === topitem) {
                                    const updatedSubIndicators =
                                      topitem.metrics.map((subitem) => {
                                        if (subIndicatorItem === subitem) {
                                          return {
                                            ...subitem,
                                            weight: newWeight,
                                          };
                                        }
                                        return subitem;
                                      });
                                    return {
                                      ...topitem,
                                      metrics: updatedSubIndicators,
                                    };
                                  }
                                  return topitem;
                                }
                              );
                              return {
                                ...item,
                                indicators: updatedTopIndicators,
                              };
                            }
                            return item;
                          });
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
