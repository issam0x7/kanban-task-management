import { cn } from '@/lib/utils';

type SpinnerProp = {
    size?: string;
    color?: string;
    className?: string;
};

const Spinner = ({ size = 'md', color = 'primary', className }: SpinnerProp) => {
    const sizeMap: any = {
        xs: 'h-[0.75rem] w-[0.75rem]',
        sm: 'h-[1rem] w-[1rem]',
        md: 'h-[1.5rem] w-[1.5rem]',
        lg: 'h-[2rem] w-[2rem]',
        xl: 'h-[3rem] w-[3rem]',
    };

    const colorMap = `border-t-current border-r-current `;

    return (
        <div
            color={color}
            className={cn(
                'inline-block  border-t-2 border-r-2 border-t-current border-r-current border-b-2 border-l-2 border-solid border-b-transparent border-l-transparent rounded-full animate-spin text-primary',
                sizeMap[size],
                className,
            )}
        >
            <span className="sr-only">...Loading</span>
        </div>
    );
};

export default Spinner;
