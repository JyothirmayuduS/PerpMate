import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CodingWorkspace from "@/components/coding/CodingWorkspace";
import { codingQuestions, getCodingQuestion } from "@/data/codingQuestions";

export const dynamicParams = true;

export function generateStaticParams() {
  // Pre-render the core curriculum. Rotating drills remain fully routable and
  // are rendered on demand so a large practice bank does not slow deployments.
  return codingQuestions
    .filter((question) => !question.templateSourceId)
    .map((question) => ({ id: question.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const question = getCodingQuestion(id);

  if (!question) {
    return { title: "Coding Problem Not Found — PrepMate" };
  }

  const title = `${question.title} — PrepMate Coding Lab`;
  return {
    title,
    description: question.summary,
    openGraph: {
      title,
      description: question.summary,
      images: [],
    },
    twitter: {
      title,
      description: question.summary,
      images: [],
    },
  };
}

export default async function CodingQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const question = getCodingQuestion(id);

  if (!question) notFound();

  return <CodingWorkspace key={question.id} question={question} />;
}
