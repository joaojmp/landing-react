import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Report({ report }: { report: any }) {
    return (
        <ResponsiveContainer width="100%" height={300} className="bg-card border rounded-xl mt-6">
            <AreaChart height={300} data={report} margin={{ top: 35, bottom: 15, right: 50, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Sessões" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="Usuários" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    );
};
