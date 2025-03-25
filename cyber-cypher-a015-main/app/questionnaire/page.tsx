// app/questionnaire/page.tsx
import React from 'react';
import MentorMenteeForm from '@/components/MentorMenteeForm';

export default function QuestionnairePage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <MentorMenteeForm />
    </div>
  );
}
