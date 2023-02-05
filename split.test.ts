import { assertEquals } from "https://deno.land/std@0.176.0/testing/asserts.ts";

Deno.test("split 1", () => {
  const result = [..."test"];
  assertEquals(result, ["t", "e", "s", "t"]);
});

Deno.test("split 2", () => {
  const text = "日本語";
  const result = [...text];
  assertEquals(text.length, 3);
  assertEquals(result, ["日", "本", "語"]);
});

Deno.test("split 3", () => {
  const text = "𩸽𩸽𩸽";
  const result = [...text];
  assertEquals(text.length, 6);
  assertEquals(result, ["𩸽", "𩸽", "𩸽"]);
});

Deno.test("split 4", () => {
  const text = "😸😸😸";
  const result = [...text];
  assertEquals(text.length, 6);
  assertEquals(result, ["😸", "😸", "😸"]);
});
