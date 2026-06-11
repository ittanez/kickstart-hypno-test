import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { handleSendResults } from "../_shared/handler.ts";

serve(handleSendResults);
