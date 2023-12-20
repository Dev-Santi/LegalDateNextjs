import BottomTriangle from '@/components/triangles/BottomTriangle';
import TopTriangle from '@/components/triangles/TopTriangle';

export default function Home() {
    return (
        <div className='min-h-screen bg-[url("/bg.jpg")] bg-cover bg-bottom'>
            <div className='min-h-screen bg-[rgba(0,37,47,0.9)]'>
                <TopTriangle />
                <main>
                    <header></header>
                </main>
                <BottomTriangle />
            </div>
        </div>
    );
}
