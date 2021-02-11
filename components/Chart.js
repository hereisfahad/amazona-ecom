import { useState, useRef, useEffect } from 'react'
import { Box } from "@chakra-ui/react";
import * as echarts from 'echarts';

const Chart = ({ options }) => {
    const chartRef = useRef(null)
    const [chart, setChart] = useState(null)
    
    useEffect(() => {
        let myChart = echarts.init(chartRef?.current);
        setChart(myChart)
        myChart.setOption(options);
    }, [chartRef, options, setChart])

    useEffect(() => {
        const resizeChart = () => chart.resize()
        window.addEventListener('resize', resizeChart)
        return () => {
            window.removeEventListener('resize', resizeChart)
        }
    }, [chart])

    return (
        <Box 
            width="100%"
            height="400px"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="8px"
            paddingX="10px"
            paddingY="15px"
            shadow={['md', 'lg']}
            ref={chartRef}
            resize
        />
    )
}

export default Chart
