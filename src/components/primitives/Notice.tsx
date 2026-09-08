type NoticeProps = {
  /**
   * The question in Newsreader.
   */
  question: string;
  /**
   * The answer in reading text beneath. All answers visible — no accordion.
   */
  answer: string;
};

/**
 * A notice: question in Newsreader, answer in reading text beneath.
 *
 * Constraint enforces: no accordion, no chevron, no plus sign — every answer
 * is visible. A catalogue does not hide its conditions.
 */
export function Notice({ question, answer }: NoticeProps) {
  return (
    <div className="border-t border-ink/10 pt-8">
      <h3 className="font-newsreader text-lot-title leading-title text-ink">
        {question}
      </h3>
      <p className="mt-4 max-w-measure font-newsreader text-reading leading-reading text-quill">
        {answer}
      </p>
    </div>
  );
}
