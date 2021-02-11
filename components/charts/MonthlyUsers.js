import { useState, useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { format, isBefore, isAfter, isWithinInterval } from 'date-fns'
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('@/components/Chart'), { ssr: false });

const Months = new Map()
Months.set(1, 'Jan')
Months.set(2, 'Feb')
Months.set(3, 'Mar')
Months.set(4, 'Apr')
Months.set(5, 'May')
Months.set(6, 'Jun')
Months.set(7, 'Jul')
Months.set(8, 'Aug')
Months.set(9, 'Sep')
Months.set(10, 'Oct')
Months.set(11, 'Nov')
Months.set(12, 'Dec')

const MonthlyUsers = () => {
    const [monthsData, setMonthsData] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const { data } = useSWR(`/api/users/chart-data`, fetcher);

    useEffect(() => {
        if (data?.users) {
            const { users } = data
            let startDate = new Date(users[0]?.createdAt)
            let endDate = new Date(users[0]?.createdAt)
            let monthsData = {}

            users.map(({ createdAt }) => {
                let date = new Date(createdAt)
                if (isBefore(date, startDate)) startDate = date
                if (isAfter(date, endDate)) endDate = date
                let year = date.getFullYear()
                let month = format(date, 'MMM')
                if (!monthsData[year]) {
                    monthsData[year] = {}
                }
                if (!monthsData[year][month]) {
                    monthsData[year][month] = 1
                } else {
                    monthsData[year][month]++
                }
            })
            setMonthsData(monthsData)
            setStartDate(startDate)
            setEndDate(endDate)
        }
    }, [data])

    let timelineOptions = []
    Object.keys(monthsData).map(year => {
        let seriesData = []
        for (let month of Months.values()) {
            if (isWithinInterval(new Date(`01/${month}/${year}`), { start: startDate, end: endDate })) {
                seriesData.push({ name: month, value: monthsData[year]?.[month] ?? 0 })
            } else {
                seriesData.push({ name: month, value: monthsData[year]?.[month] ?? null })
            }
        }

        timelineOptions.push(
            {
                series: [
                    {
                        name: 'users',
                        type: 'line',
                        data: seriesData
                    }
                ]
            }
        )
    })

    const options = {
        baseOption: {
            timeline: {
                axisType: "category",
                autoPlay: false,
                playInterval: 3000,
                data: Object.keys(monthsData),
            },
            title: {
                text: 'Monthly Users Trend'
            },
            tooltip: { show: true, trigger: 'axis' },
            xAxis: [{
                type: "category",
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            }],
            yAxis: [{
                type: "value",
            }],
        },
        options: timelineOptions
    }

    return (
        <Chart options={options} />
    )
}

export default MonthlyUsers
