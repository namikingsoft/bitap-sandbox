import { assertEquals } from "https://deno.land/std@0.176.0/testing/asserts.ts";
import { search } from "./search.ts";

Deno.test("search", () => {
  assertEquals(search("abcde", "abcde", 0), true);
  assertEquals(search("abcde", "abcd", 0), false);
  assertEquals(search("abcde", "abcd", 1), true);
  assertEquals(search("abcde", "abcc", 1), false);
  assertEquals(search("abcde", "abcc", 2), true);
});
