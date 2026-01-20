import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface KPICardProps {
    title: string
    value: string
    description?: string
    icon: LucideIcon
    trend?: string
    trendUp?: boolean
}

export function KPICard({ title, value, description, icon: Icon, trend, trendUp }: KPICardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(description || trend) && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {trend && (
                            <span className={trendUp ? "text-success-500 mr-1" : "text-destructive mr-1"}>
                                {trend}
                            </span>
                        )}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
