import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const ChannelGrouping: React.FC<any> = ({ channelGrouping }) => {
    return (
        <ResponsiveContainer width="100%" height={300} className="bg-card border rounded-xl mt-6">
            <PieChart height={300}>
                <Pie
                    dataKey="value"
                    data={channelGrouping}
                    fill="#8884d8"
                    cx="50%"
                    cy="50%"
                    label
                />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ChannelGrouping;
