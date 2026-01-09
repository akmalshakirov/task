import { Loader2Icon } from "lucide-react";

const Loader = () => {
    return (
        <div className='h-screen flex flex-col items-center gap-3 justify-center'>
            <Loader2Icon
                className='animate-spin [animation-duration:0.5s]'
                size={35}
            />
            <h2 className='text-2xl'>Loading...</h2>
        </div>
    );
};

export default Loader;
