console.log('Hello world');

import dotenv from 'dotenv'
dotenv.config()


const API_KEY = process.env.API_KEY
const LAT = process.env.LAT
const LON = process.env.LON

const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

async function get_data() {
    try {
        const response = await fetch(URL)

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        const result = await response.json();

        // result.list contains ~40 entries (every 3 hours)
        // Pick one entry per day (12:00:00)
        const dailyData = result.list.filter(item => item.dt_txt.includes("12:00:00"))

        dailyData.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
            
            const temp = item.main.temp;
            console.log(`${dayName}: ${temp}°C`)
        });

    } catch (error) {
        console.error(error.message);
    }
}

get_data();

console.log('done');
