"use client";

import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  BadgeDollarSign,
  BarChart,
  Briefcase,
  Building,
  CreditCard,
  DollarSign,
  File,
  HelpCircle,
  Inbox,
  Layers,
  LayoutDashboard,
  MessagesSquare,
  PenBox,
  PiggyBank,
  Repeat2,
  Search,
  Send,
  Settings,
  ShoppingCart,
  Tag,
  Trash2,
  Users2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Mail } from "../data";
import { useMail } from "../use-mail";
import { AccountSwitcher } from "./account-switcher";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";
import { Nav } from "./nav";

interface TransactionsDashboardProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function TransactionsDashboard({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: TransactionsDashboardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[1200px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true,
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false,
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2",
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Dashboard",
                label: "",
                icon: LayoutDashboard,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Transactions",
                label: "9",
                icon: Layers,
                variant: "default",
                link: "/dashboard/transactions",
              },
              {
                title: "Accounts",
                label: "3",
                icon: CreditCard,
                variant: "ghost",
                link: "/dashboard/accounts",
              },
              {
                title: "Investments",
                label: "",
                icon: BarChart,
                variant: "ghost",
                link: "/dashboard/investments",
              },
              {
                title: "Categories",
                label: "",
                icon: Tag,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Recurring",
                label: "",
                icon: Repeat2,
                variant: "ghost",
                link: "/dashboard/",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Credit Card",
                label: "972",
                icon: CreditCard,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Credit Card",
                label: "342",
                icon: CreditCard,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Checking",
                label: "128",
                icon: DollarSign,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Savings",
                label: "8",
                icon: PiggyBank,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Banking",
                label: "21",
                icon: Building,
                variant: "ghost",
                link: "/dashboard/",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Funds",
                label: "483",
                icon: Briefcase,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Coinbase",
                label: "145",
                icon: BadgeDollarSign,
                variant: "ghost",
                link: "/dashboard/",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Get help",
                label: "",
                icon: HelpCircle,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Settings",
                label: "",
                icon: Settings,
                variant: "ghost",
                link: "/dashboard/",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex h-[52px] items-center px-4 py-2">
              <h1 className="text-xl font-bold">Transactions</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All transactions
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
