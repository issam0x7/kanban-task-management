import Spinner from '@/components/ui/spinner';

export default function DashboardLoading() {
    return (
        <div className='w-full h-full grid place-content-center'>
            <Spinner />
        </div>
    );
}
