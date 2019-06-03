import React,{Component, useContext, useState, useEffect} from 'react';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, LineSeries, PieSeries} from 'react-jsx-highcharts';
import {ContentContext} from "../../Context/ContentContext";



const StatisticBlock = ({}) => {
    const {history} = useContext(ContentContext);
    const normalCats = normalizeHistory({history});
    const monthPositive = [];
    const monthNegative = []
    for(let key in normalCats.categories) {
        if (key==='РАСХОДЫ' || key==='ДОХОДЫ') continue;
        const month = 4;
        const result = {name: key, y: Math.abs(normalCats.categories[key][month])};
        if (normalCats.categories[key][month] > 0) {
            monthPositive.push(result);
        } else {
            monthNegative.push(result);
        }
    }

    const plotOptions = {
        tooltip: {
            shared: true,
            crosshairs: true
        },
        series:{
            pointStart: 0
        }
    };
    const pieOptions =  {
        tooltip: {
            pointFormat: '<b>{point.y}</b>'
        },
        pie: {
            allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                }
        }
    };

    return (
        <div style={{margin:'2rem 0 0 0'}} className="app">
            <HighchartsChart
                tooltip={plotOptions.tooltip}
            >
                <Chart />

                <Title>Динамика трат и доходов</Title>

                <Legend layout="vertical" align="right" verticalAlign="middle" />

                <XAxis categories={['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']}>
                    <XAxis.Title>Время, месяц</XAxis.Title>
                </XAxis>

                <YAxis>
                    <YAxis.Title>Сумма, руб</YAxis.Title>
                    {normalCats.toArray().map(elem => <LineSeries name={elem.name} data={elem.data.map(x=>Math.abs(x))} />)}
                </YAxis>
            </HighchartsChart>
            <div className="app">
                <HighchartsChart tooltip={pieOptions.tooltip}>
                    <Chart />
                    <Title>Структура трат и доходов</Title>
                    <PieSeries
                        dataLabels={pieOptions.pie.dataLabels}
                        data={monthPositive}
                        center={[250, 150]}
                        size={300}
                    />
                    <PieSeries
                        dataLabels={pieOptions.pie.dataLabels}
                        data={monthNegative}
                        center={[750, 150]}
                        size={300}
                        showInLegend={false} />
                </HighchartsChart>
            </div>
        </div>
    )
};

const normalizeHistory = ({history}) => {
    const cats = history.filter(elem=>elem.purse===1).reduce((accum,elem) => {
        if (accum[elem.category]) {
            accum[elem.category] = [...accum[elem.category],elem];
        } else {
            accum[elem.category]=[elem];
        }
        return accum;
    },{});

    const objToArray = () => {
        const result = [];
        for (let key in normalCats.categories) {
            result.push({name: key, data:normalCats.categories[key]})
        }
        normalCats.count = normalCats.categories.length;
        return result;
    };

    const normalCats = {categories:{'РАСХОДЫ':[], "ДОХОДЫ": []},count:0, toArray: objToArray};
    for (let key in cats){
        normalCats.categories[key] = [];
        cats[key].forEach(elem => {
            const month = elem.date.getMonth();
            if (normalCats.categories[key][month]) {
                normalCats.categories[key][month] += elem.amount;
            } else {
                normalCats.categories[key][month] = elem.amount;
            }

            if (elem.amount > 0) {
                if (normalCats.categories["ДОХОДЫ"][month]){
                    normalCats.categories["ДОХОДЫ"][month] += elem.amount;
                } else {
                    normalCats.categories["ДОХОДЫ"][month] = elem.amount;
                }
            } else {
                if (normalCats.categories["РАСХОДЫ"][month]){
                    normalCats.categories["РАСХОДЫ"][month] += elem.amount;
                } else {
                    normalCats.categories["РАСХОДЫ"][month] = elem.amount;
                }
            }
        });
        if (normalCats.categories[key].length > normalCats.count) normalCats.count=normalCats.categories[key].length;
    }
    for (let cat in normalCats.categories){
        for (let i = 0; i<normalCats.count; i++){
            if (!(normalCats.categories[cat][i])){
                normalCats.categories[cat][i] = 0;
            }
        }
    }
    return normalCats;
};

export default withHighcharts(StatisticBlock, Highcharts);