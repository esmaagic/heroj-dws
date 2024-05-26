'use client'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation';

export default function QuizPage ({ params }: { params: { quiz_id: string } }){
    const router = useRouter()
    console.log(params)
    
    
    return <div>
        Odabrali ste kviz: {params.quiz_id}
    </div>
}