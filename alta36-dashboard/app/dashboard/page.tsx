"use client"

import { Activity, Users, MessageSquare, TrendingUp, Calendar } from "lucide-react"
import { KPICard } from "@/components/dashboard/kpi-card"
import { RecentReplies } from "@/components/dashboard/recent-replies"
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings"

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                {/* Sync Button Placeholder could go here */}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KPICard
                    title="Active Prospects"
                    value="1,234"
                    icon={Users}
                    trend="+12%"
                    trendUp={true}
                    description="from last month"
                />
                <KPICard
                    title="Meetings This Week"
                    value="12"
                    icon={Calendar}
                    description="3 today"
                />
                <KPICard
                    title="Response Rate"
                    value="4.5%"
                    icon={MessageSquare}
                    trend="+0.8%"
                    trendUp={true}
                    description="avg. campaign rate"
                />
                <KPICard
                    title="Pipeline Value"
                    value="$45,231"
                    icon={Activity}
                    trend="-2%"
                    trendUp={false}
                    description="potential revenue"
                />
            </div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-5">
                <RecentReplies />
                <UpcomingMeetings />
            </div>
        </div>
    )
}
