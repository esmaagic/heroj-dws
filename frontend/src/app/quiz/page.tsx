'use client'
import ListOfQuiz from "@/components/ListOfQuiz";
import QuizCategory from "@/components/QuizCategory";
import SearchBarForQuiz from "@/components/SearchBarForQuiz";

export default function Quiz(){
    
    return (
        <div> 
            <SearchBarForQuiz />
            <QuizCategory />
            <ListOfQuiz />
        </div>
    )
}