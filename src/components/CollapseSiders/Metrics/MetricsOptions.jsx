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
        const updatedSubIndicatorren = topIndicatorItem.subIndicatorren.map(
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
          subIndicatorren: updatedSubIndicatorren
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
    const allChecked = topIndicatorItem.subIndicatorren.every(
      (subIndicatorItem) => subIndicatorItem.checked
    );
    const allUnchecked = topIndicatorItem.subIndicatorren.every(
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
        const updatedSubIndicatorren = topIndicatorItem.subIndicatorren.map(
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
          subIndicatorren: updatedSubIndicatorren
        };
      }
      return topIndicatorItem;
    });
    setData(updatedData);
  };

  const handleSaveWeight = (topIndicator, newWeight) => {
    // Update the data with the new weight
    const updatedData = data.map((item) => {
      if (item.topIndicator === topIndicator) {
        return {
          ...item,
          weight: newWeight
        };
      }
      return item;
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
            onWeightSave={handleSaveWeight}
          />
          <Collapse
            in={openTopIndicators[topIndicatorItem.topIndicator]}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ pl: 2, pr: 2 }}>
              {topIndicatorItem.subIndicatorren.map(
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
                    onWeightSave={handleSaveWeight}
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