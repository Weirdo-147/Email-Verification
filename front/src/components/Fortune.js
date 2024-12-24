import {useDaily} from "@daily-co/daily-react";
import React, { useEffect, useState } from "react";

const Fortune=()=>{
    const daily=useDaily();
    const state=daily?.meetingState();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true);
      }, [state]);
    if(state){
        return <div>Loading....</div>
    }
    const fortunes = [
        "Good things come to those who wait, but better things come to those who work for it.",
        "Your hard work will pay off soon.",
        "The best is yet to come.",
        "Don't be afraid to take risks.",
        "You will find success in unexpected places.",
        "Believe in yourself and all that you are.",
        "Your journey will bring great rewards.",
        "Today is a gift, that's why it's called the present.",
        "The only way to do great work is to love what you do.",
        "Your positive action combined with positive thinking results in success.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "Dream big and dare to fail.",
        "Your future is created by what you do today, not tomorrow.",
        "You will achieve great things.",
        "Life is 10% what happens to us and 90% how we react to it.",
        "The best way to predict the future is to create it.",
        "The only limit to our realization of tomorrow will be our doubts of today.",
        "Opportunities don't happen. You create them.",
        "You will be pleasantly surprised by a financial windfall.",
        "Luck is on your side today.",
        "Happiness is not by chance but by choice.",
        "Your kindness will lead you to success.",
        "Good things are coming your way.",
        "Everything you can imagine is real.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Stay positive and good things will happen.",
        "Your efforts will be rewarded.",
        "A journey of a thousand miles begins with a single step.",
        "Your creativity knows no bounds.",
        "Success is a journey, not a destination.",
        "You will make a difference in the world.",
        "An exciting opportunity is on the horizon.",
        "Every day may not be good, but there's something good in every day.",
        "The best is yet to come. Be patient.",
        "Your life is about to take an exciting turn.",
        "Your positivity is your greatest strength.",
        "Great things never come from comfort zones.",
        "Your talents will be recognized and rewarded.",
        "Every accomplishment starts with the decision to try.",
        "The sun always shines above the clouds.",
        "Your dreams are within reach, keep going.",
        "Your smile brightens the lives of those around you.",
        "You have the power to create change.",
        "A positive attitude brings great opportunities.",
        "Your potential is limitless.",
        "You are destined for success.",
        "Your resilience will open new doors for you.",
        "A new friendship will bring joy into your life.",
        "Your intuition will guide you to great things.",
        "A journey of self-discovery awaits you.",
    ]
    const randomFortune=fortunes[Math.floor(Math.random()*fortunes.length)]
    
    return (
        <div
      className={`absolute top-1/2 left-1/2 mt-16 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl ${
        isLoaded ? "motion-safe":"animate-spin"
      }transition-opacity duration-500`}
    >
      <h1 className="text-2xl mb-4 text-gray-800 underline font-italic">Daily Fortune</h1>
      <p className="text-gray-800 font-custom1 font-semibold text-5xl">{randomFortune}</p>
    </div>
    )
}
export default Fortune;