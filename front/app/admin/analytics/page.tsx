"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPopularSearchTerms, getSearchConversionRate } from "@/lib/analytics"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

export default function AnalyticsPage() {
  const [popularSearches, setPopularSearches] = useState<{ term: string; count: number }[]>([])
  const [conversionRate, setConversionRate] = useState(0)
  const [mobileConversionRate, setMobileConversionRate] = useState(0)
  const [activeTab, setActiveTab] = useState("search")
  const [searchDeviceTab, setSearchDeviceTab] = useState("all")

  useEffect(() => {
    // Load analytics data
    const searches = getPopularSearchTerms()
    const conversion = getSearchConversionRate()
    const mobileConversion = getSearchConversionRate("mobile")

    setPopularSearches(searches)
    setConversionRate(conversion)
    setMobileConversionRate(mobileConversion)
  }, [])

  // Mock data for other analytics
  const categoryData = [
    { name: "Headphones", value: 40 },
    { name: "Earbuds", value: 30 },
    { name: "Speakers", value: 20 },
    { name: "Accessories", value: 10 },
  ]

  // Mock data for device comparison
  const deviceComparisonData = [
    { name: "Searches", desktop: 748, mobile: 1248 },
    { name: "Clicks", desktop: 423, mobile: 856 },
    { name: "Conversions", desktop: 89, mobile: 132 },
    { name: "Zero Results", desktop: 42, mobile: 89 },
  ]

  // Mock data for mobile search metrics over time
  const mobileSearchTrend = [
    { date: "Jan", searches: 850, conversions: 210 },
    { date: "Feb", searches: 940, conversions: 240 },
    { date: "Mar", searches: 1020, conversions: 280 },
    { date: "Apr", searches: 1120, conversions: 320 },
    { date: "May", searches: 1248, conversions: 380 },
  ]

  const COLORS = ["#D4AF37", "#006400", "#000000", "#8884d8", "#82ca9d"]

  return (
    <AdminLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Search Analytics</TabsTrigger>
            <TabsTrigger value="products">Product Analytics</TabsTrigger>
            <TabsTrigger value="customers">Customer Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6 pt-6">
            <Tabs value={searchDeviceTab} onValueChange={setSearchDeviceTab}>
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="all">All Devices</TabsTrigger>
                <TabsTrigger value="desktop">Desktop</TabsTrigger>
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Search Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {searchDeviceTab === "mobile"
                      ? mobileConversionRate.toFixed(1)
                      : searchDeviceTab === "desktop"
                        ? (conversionRate * 0.8).toFixed(1)
                        : conversionRate.toFixed(1)}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">Percentage of searches leading to clicks</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {searchDeviceTab === "mobile" ? "1,248" : searchDeviceTab === "desktop" ? "748" : "1,996"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {searchDeviceTab === "mobile" ? "+18%" : searchDeviceTab === "desktop" ? "+8%" : "+12%"} from last
                    month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Zero Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {searchDeviceTab === "mobile" ? "89" : searchDeviceTab === "desktop" ? "42" : "131"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {searchDeviceTab === "mobile" ? "7.1%" : searchDeviceTab === "desktop" ? "5.6%" : "6.6%"} of total
                    searches
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Click Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {searchDeviceTab === "mobile" ? "2.8" : searchDeviceTab === "desktop" ? "2.1" : "2.4"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {searchDeviceTab === "mobile" ? "-0.2" : searchDeviceTab === "desktop" ? "-0.4" : "-0.3"} from last
                    month
                  </p>
                </CardContent>
              </Card>
            </div>

            {searchDeviceTab === "mobile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Mobile Search Trends</CardTitle>
                  <CardDescription>Search volume and conversions over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mobileSearchTrend} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="searches" stroke="#D4AF37" name="Searches" />
                        <Line type="monotone" dataKey="conversions" stroke="#006400" name="Conversions" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {searchDeviceTab === "all" && (
              <Card>
                <CardHeader>
                  <CardTitle>Device Comparison</CardTitle>
                  <CardDescription>Search metrics by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={deviceComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="desktop" fill="#006400" name="Desktop" />
                        <Bar dataKey="mobile" fill="#D4AF37" name="Mobile" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Search Terms</CardTitle>
                  <CardDescription>
                    Top search queries by volume {searchDeviceTab !== "all" ? `(${searchDeviceTab})` : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={
                          popularSearches.length > 0
                            ? popularSearches
                            : [
                                { term: "headphones", count: 145 },
                                { term: "wireless", count: 132 },
                                { term: "noise cancelling", count: 97 },
                                { term: "bluetooth", count: 85 },
                                { term: "earbuds", count: 72 },
                                { term: "sony", count: 68 },
                                { term: "bose", count: 54 },
                                { term: "speaker", count: 47 },
                                { term: "gaming", count: 39 },
                                { term: "microphone", count: 28 },
                              ]
                        }
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="term" angle={-45} textAnchor="end" height={60} interval={0} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#D4AF37" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Search Categories</CardTitle>
                  <CardDescription>Distribution of search results by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Search Insights</CardTitle>
                <CardDescription>Key findings from search analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchDeviceTab === "mobile" || searchDeviceTab === "all" ? (
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-medium">Mobile Search Behavior</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mobile users are 62% more likely to use search filters than desktop users.
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mobile searches peak between 6-9pm, while desktop searches are highest during work hours.
                      </p>
                    </div>
                  ) : null}
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="font-medium">Zero Results Searches</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Top searches with no results: "waterproof earbuds", "bone conduction", "kids headphones"
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consider adding these products or improving search synonyms.
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="font-medium">Search Trends</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Increasing interest in "noise cancelling" and "wireless" features.
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consider highlighting these features in product listings and marketing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Analytics</CardTitle>
                <CardDescription>Coming soon</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Product analytics dashboard is under development. Check back soon for insights on product performance,
                  views, conversions, and more.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Analytics</CardTitle>
                <CardDescription>Coming soon</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Customer analytics dashboard is under development. Check back soon for insights on customer behavior,
                  demographics, purchase patterns, and more.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
