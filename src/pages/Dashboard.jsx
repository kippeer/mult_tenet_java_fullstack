import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export default function Dashboard() {
  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const response = await api.get('/api/patients');
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="rounded-lg bg-white shadow">
        <div className="p-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="p-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Dashboard</h2>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Total Patients</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {patients?.length || 0}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}