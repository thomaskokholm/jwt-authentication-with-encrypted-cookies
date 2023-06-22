import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types_db";

type Product = Database["public"]["Tables"]["products"]["Row"];

const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

class SupabaseError extends Error {
  constructor(message: any = "Unknown error") {
    super(message);
    this.name = "SupabaseError";
  }
}

export const getProducts = async (): Promise<Array<Product> | null> => {
  try {
    const { data } = await supabaseAdmin
      .from("products")
      .select("*")
      .throwOnError();
    return data;
  } catch (error) {
    throw new SupabaseError(error);
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("id", id)
      .single()
      .throwOnError();
    return data;
  } catch (error) {
    throw new SupabaseError(error);
  }
};
