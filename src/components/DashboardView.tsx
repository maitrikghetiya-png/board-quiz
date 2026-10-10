import React from 'react';
import {
  PlayCircle,
  Layers,
  Award,
  Clock,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  BookOpen,
  ArrowUpRight,
  Atom,
  FlaskConical,
  Binary,
  ArrowRight,
  History,
  Languages
} from 'lucide-react';
import { SUBJECTS, CHAPTERS } from '../data/syllabus';
import { SubjectId, ExamResult, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { LanguageSelector } from './LanguageSelector';
import { Footer } from './Footer';

interface DashboardViewProps {
  stats: {
    totalAttempted: number;
    averageAccuracy: number;
    overallPercentage: number;
    bestScores: Record<SubjectId, { marks: number; maxMarks: number; percentage: number; date: number } | null>;
    recentResults: ExamResult[];
  };
  onStartMock: (subjectId?: SubjectId) => void;
  onPracticeByChapter: (subjectId?: SubjectId) => void;
  onViewResult: (resultId: string) => void;
  onViewAllResults: () => void;
  onViewSyllabus: (subjectId?: SubjectId) => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  onStartMock,
  onPracticeByChapter,
  onViewResult,
  onViewAllResults,
  onViewSyllabus,
  currentLanguage,
  onLanguageChange
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const getSubjectThemes = (subId: SubjectId) => {
    switch (subId) {
      case 'physics':
        return {
          name: t.subjectPhysics,
          desc: t.subjectPhysicsDesc,
          icon: Atom,
          iconBg: 'bg-amber-50 text-amber-800 border-amber-200',
          accentBorder: 'hover:border-[#FFD43B]',
          badge: 'bg-amber-50 text-amber-900 border-amber-300 font-bold',
          topLine: 'bg-[#FFD43B]',
          btnPrimary: 'bg-[#111318] hover:bg-[#292D35] text-[#FFD43B] font-bold',
          highlights: ['Electrostatics & Current', 'Magnetism & AC', 'Wave & Ray Optics', 'Semiconductors']
        };
      case 'chemistry':
        return {
          name: t.subjectChemistry,
          desc: t.subjectChemistryDesc,
          icon: FlaskConical,
          iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          accentBorder: 'hover:border-emerald-500',
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          topLine: 'bg-emerald-600',
          btnPrimary: 'bg-emerald-700 hover:bg-emerald-800 text-white font-bold',
          highlights: ['Solutions & Kinetics', 'Electrochemistry', 'Coordination Compounds', 'Organic Halo/Aldehydes']
        };
      case 'mathematics':
        return {
          name: t.subjectMathematics,
          desc: t.subjectMathematicsDesc,
          icon: Binary,
          iconBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
          accentBorder: 'hover:border-cyan-500',
          badge: 'bg-cyan-50 text-cyan-900 border-cyan-200',
          topLine: 'bg-cyan-600',
          btnPrimary: 'bg-[#111318] hover:bg-[#292D35] text-cyan-300 font-bold',
          highlights: ['Calculus (35 Marks)', 'Vectors & 3D (14 Marks)', 'Matrices & Determinants', 'Bayes Probability']
        };
    }
  };

  const getSubjectChaptersCount = (subId: SubjectId) => {
    return CHAPTERS.filter(ch => ch.subjectId === subId).length;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-4">
      
      {/* Hero Header */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111318] text-[#FFD43B] text-xs font-bold tracking-wide border border-[#292D35]">
              <span className="w-2 h-2 rounded-full bg-[#FFD43B]" />
              <span>{t.appSession}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              <span>Created by Maitrik Ghetiya</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
              <span>Quad AI School of Technology</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111318] leading-tight">
            {t.appTagline.split('.')[0]}. <span className="text-[#8F6B00] underline decoration-[#FFD43B] decoration-4 underline-offset-4">{t.appTagline.split('.')[1] || ''}</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {currentLanguage === 'gu'
              ? 'CBSE ધોરણ ૧૨ સાયન્સ સ્ટ્રીમ માટે સંપૂર્ણ અભ્યાસક્રમ આધારિત મોક ટેસ્ટિંગ પ્લેટફોર્મ. સેક્શન-A એકલ-પસંદગી MCQ, ગાણિતિક ગણતરીઓ અને સ્ટેપ-બાય-સ્ટેપ માર્કિંગ રૂબ્રિક્સમાં નિપુણતા મેળવો.'
              : currentLanguage === 'hi'
              ? 'CBSE कक्षा १२ विज्ञान संकाय के लिए उच्च-गुणवत्ता पूर्ण पाठ्यक्रम आधारित मॉक टेस्टिंग प्लेटफॉर्म। खंड-A एकल-विकल्प MCQ, गणितीय गणनाओं और चरणबद्ध अंकन पद्धति में निपुणता प्राप्त करें।'
              : 'High-yield, syllabus-accurate mock testing for CBSE Class 12 Science stream. Master Section-A single-correct MCQs, numerical calculations, and step-by-step marking rubrics.'}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartMock()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD43B] hover:bg-[#F5C518] active:bg-[#E6B800] text-[#111318] font-bold text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 fill-[#111318] text-[#FFD43B]" />
              <span>{t.startMockBtn}</span>
            </button>

            <button
              onClick={() => onPracticeByChapter()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F3F4F6] hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-600" />
              <span>{t.byChapterBtn}</span>
            </button>

            <button
              onClick={() => onViewSyllabus()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>{t.syllabusBlueprintBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Language Selector Card on Home Page */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              {t.langSelectTitle}
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            {currentLanguage === 'en' ? 'English Medium' : currentLanguage === 'gu' ? 'ગુજરાતી માધ્યમ' : 'हिंदी माध्यम'}
          </span>
        </div>

        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          variant="cards"
        />
      </section>

      {/* Official Curriculum Advisory */}
      <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm">
        <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-slate-900">{t.curriculumAdvisoryTitle}</span>
          <span>{t.curriculumAdvisoryText}</span>
        </div>
      </div>

      {/* Performance Statistics Overview */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.statAttempted}</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.totalAttempted}</div>
          <p className="text-xs text-slate-500 mt-1">{t.statAttemptedSub}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.statAccuracy}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {stats.totalAttempted > 0 ? `${stats.averageAccuracy}%` : '—'}
          </div>
          <p className="text-xs text-slate-500 mt-1">{t.statAccuracySub}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.statCumulativeScore}</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {stats.totalAttempted > 0 ? `${stats.overallPercentage}%` : '—'}
          </div>
          <p className="text-xs text-slate-500 mt-1">{t.statCumulativeSub}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.statSyllabusScope}</span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">37 Chapters</div>
          <p className="text-xs text-slate-500 mt-1">{t.statSyllabusSub}</p>
        </div>
      </section>

      {/* Three Distinct Subject Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {currentLanguage === 'gu' ? 'વિષયવાર પ્રેક્ટિસ મોડ્યુલ' : currentLanguage === 'hi' ? 'विषयवार अभ्यास मॉड्यूल' : 'Subject Practice Modules'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentLanguage === 'gu' ? 'વિષય પસંદ કરીને પ્રકરણ, મુશ્કેલી સ્તર અને પ્રશ્નોની સંખ્યા નક્કી કરો' : currentLanguage === 'hi' ? 'विषय चुनकर अध्याय, कठिनाई स्तर और प्रश्नों की संख्या निर्धारित करें' : 'Select a subject to customize unit focus, difficulty, and question count'}
            </p>
          </div>
          <button
            onClick={() => onStartMock()}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:underline"
          >
            <span>{t.combinedFullTest}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['physics', 'chemistry', 'mathematics'] as SubjectId[]).map(subId => {
            const subject = SUBJECTS[subId];
            const chCount = getSubjectChaptersCount(subId);
            const best = stats.bestScores[subId];
            const theme = getSubjectThemes(subId);
            const Icon = theme.icon;

            return (
              <div
                key={subId}
                className={`bg-white rounded-2xl border border-slate-200 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group ${theme.accentBorder}`}
              >
                {/* Subject Header Accent */}
                <div className={`h-1.5 w-full ${theme.topLine}`} />

                <div className="p-6 space-y-4">
                  {/* Top line with Icon and Subject Code */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl border ${theme.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${theme.badge}`}>
                      Code {subject.code}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                      <span>{theme.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {theme.desc}
                    </p>
                  </div>

                  {/* Exam Marks & Chapter Metrics */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        {currentLanguage === 'gu' ? 'પ્રકરણો' : currentLanguage === 'hi' ? 'अध्याय' : 'Syllabus Units'}
                      </span>
                      <span className="font-bold text-slate-800">{chCount} Chapters</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        {currentLanguage === 'gu' ? 'બોર્ડ ગુણ' : currentLanguage === 'hi' ? 'बोर्ड अंक' : 'Board Marks'}
                      </span>
                      <span className="font-bold text-slate-800">
                        {subject.totalTheoryMarks} Th + {subject.totalPracticalMarks} Pr
                      </span>
                    </div>
                  </div>

                  {/* Best Score Indicator */}
                  <div className="pt-2 text-xs">
                    <span className="text-slate-400 block text-[11px]">{t.bestPerformance}</span>
                    {best ? (
                      <span className="font-bold text-emerald-700">
                        {best.marks} / {best.maxMarks} ({best.percentage}%)
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium">{t.noTestsRecorded}</span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onPracticeByChapter(subId)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                  >
                    {t.byChapterBtn}
                  </button>

                  <button
                    type="button"
                    onClick={() => onStartMock(subId)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs shadow-2xs transition-colors cursor-pointer ${theme.btnPrimary}`}
                  >
                    <span>{t.startMockBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Previous Results Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.recentResultsTitle}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.recentResultsSub}</p>
          </div>
          {stats.recentResults.length > 0 && (
            <button
              onClick={onViewAllResults}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              {t.viewFullHistory} ({stats.totalAttempted})
            </button>
          )}
        </div>

        {stats.recentResults.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">{t.noAttemptsTitle}</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {t.noAttemptsSub}
            </p>
            <button
              onClick={() => onStartMock()}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              {t.takeFirstMockBtn}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs divide-y divide-slate-100">
            {stats.recentResults.slice(0, 4).map(res => {
              const dateStr = new Date(res.submittedAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
              const pct = res.maxMarks > 0 ? Math.round((res.marksEarned / res.maxMarks) * 100) : 0;
              const subjectName = res.config.subjectId === 'all'
                ? t.subjectAll
                : res.config.subjectId === 'physics'
                ? t.subjectPhysics
                : res.config.subjectId === 'chemistry'
                ? t.subjectChemistry
                : t.subjectMathematics;

              return (
                <div
                  key={res.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {subjectName} Mock Test
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {res.totalQuestions} Questions
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>{dateStr}</span>
                      <span>{t.resultTimeTaken}: {Math.floor(res.totalTimeTakenSeconds / 60)}m {res.totalTimeTakenSeconds % 60}s</span>
                      <span>{t.resultAccuracy}: {res.accuracyPercentage}%</span>
                      <span>{t.resultCorrectCount}: {res.correctCount}/{res.answeredCount}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5">
                    <div className="text-right">
                      <div className="text-lg font-extrabold text-slate-900">
                        <span className={res.marksEarned >= 0 ? 'text-blue-600' : 'text-rose-600'}>
                          {res.marksEarned}
                        </span>
                        <span className="text-xs font-medium text-slate-400"> / {res.maxMarks}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{pct}% Score</span>
                    </div>

                    <button
                      onClick={() => onViewResult(res.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-xs border border-slate-200 transition cursor-pointer"
                    >
                      {t.reviewAnswersBtn}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Made By Footer */}
      <Footer />

    </div>
  );
};
