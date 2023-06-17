import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import React from "react";
import { useGetSalesQuery } from "state/api";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();
  if (!data || isLoading) {
    return "Loading...";
  }
  const colors = [
    theme.palette.secondary[200],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[600],
  ];

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );
  return (
    <Box
      height={isDashboard ? "150px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "255px" : undefined}
      minWidth={isDashboard ? "255px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        margin={
          isDashboard
            ? { top: 25, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        innerRadius={0.45}
        sortByValue={true}
        enableArcLinkLabels={!isDashboard}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: isDashboard ? 100 : 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        left="50%"
        top="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        sx={{
          transform: isDashboard
            ? "translate(-70%,170%)"
            : "translate(-50%,-150%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Total: "} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
