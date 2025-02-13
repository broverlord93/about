import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import DateTimePicker from "@components/ui/DateTimePicker";
import {
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
} from "@components/ui/timeline";
import { createFileRoute } from "@tanstack/react-router";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [value, setValue] = useState<Date | undefined>();

  return (
    <div>
      <div className={"w-full"}>
        {value && value.toISOString()}
        <DateTimePicker
          onChange={([date]) => {
            setValue(date);
          }}
          options={{ mode: "range" }}
        />
      </div>
      <Timeline>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon>
              <ThumbsUp />
            </TimelineIcon>
          </TimelineHeader>
          <TimelineBody>
            <Card className={"h-full bg-lemon-chiffon-100 shadow-md"}>
              <CardHeader>
                <CardTitle>Some Title</CardTitle>
              </CardHeader>
              <CardContent>Some Content</CardContent>
            </Card>
          </TimelineBody>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
