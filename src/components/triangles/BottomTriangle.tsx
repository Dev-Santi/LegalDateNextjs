export default function BottomTriangle() {
    //'hidden md:block absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] rotate-45 bg-orange '
    return (
        <div
            className={
                'hidden absolute bottom-0 left-0 translate-x-[-50%] translate-y-[50%] rotate-45 bg-orange w-12 h-12 xl:w-60 xl:h-60'
            }
        ></div>
    );
}
