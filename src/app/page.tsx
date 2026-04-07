import { getTranslations } from "next-intl/server";
import BoxTest from "#/components/Box-test";
import Counter from "@/components/Counter";

export default async function HomePage() {
  const t = await getTranslations();
  return (
    <>
      <BoxTest />
      <Counter />
      {t("HomePage.title")}<br/>
      {t("common.test")}
    </>
  );
}
