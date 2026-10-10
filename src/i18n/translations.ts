import { SupportedLanguage } from '../types';

export interface UIStrings {
  appName: string;
  appTagline: string;
  appSession: string;
  curriculumAdvisoryTitle: string;
  curriculumAdvisoryText: string;
  
  // Navigation
  navDashboard: string;
  navStartMock: string;
  navPracticeChapter: string;
  navQuestionBank: string;
  navResults: string;
  navSyllabus: string;
  navDirectSubjects: string;
  navResumeTest: string;
  navResetAttempts: string;
  navResetConfirm: string;
  clearHistoryTitle: string;
  clearHistoryConfirmPrompt: string;
  clearHistoryCancelBtn: string;
  clearHistoryConfirmBtn: string;

  // Subjects
  subjectPhysics: string;
  subjectChemistry: string;
  subjectMathematics: string;
  subjectAll: string;
  subjectPhysicsDesc: string;
  subjectChemistryDesc: string;
  subjectMathematicsDesc: string;

  // Dashboard Metrics
  statAttempted: string;
  statAttemptedSub: string;
  statAccuracy: string;
  statAccuracySub: string;
  statCumulativeScore: string;
  statCumulativeSub: string;
  statSyllabusScope: string;
  statSyllabusSub: string;
  bestPerformance: string;
  noTestsRecorded: string;
  startMockBtn: string;
  byChapterBtn: string;
  syllabusBlueprintBtn: string;
  combinedFullTest: string;
  recentResultsTitle: string;
  recentResultsSub: string;
  noAttemptsTitle: string;
  noAttemptsSub: string;
  takeFirstMockBtn: string;
  reviewAnswersBtn: string;
  viewFullHistory: string;

  // Setup Screen
  setupTitle: string;
  setupHeading: string;
  setupSubheading: string;
  setupSubjectLabel: string;
  setupSyllabusLabel: string;
  setupFullSyllabus: string;
  setupSelectChapterPlaceholder: string;
  setupDifficultyLabel: string;
  setupDiffEasy: string;
  setupDiffEasySub: string;
  setupDiffModerate: string;
  setupDiffModerateSub: string;
  setupDiffChallenging: string;
  setupDiffChallengingSub: string;
  setupQuestionsLabel: string;
  setupDurationLabel: string;
  setupSchemeLabel: string;
  setupSchemeSub: string;
  setupPreSummary: string;
  setupPatternLabel: string;
  setupSubjectScope: string;
  setupQuestionsTime: string;
  setupMaxMarks: string;
  setupTimerRule: string;
  setupStartBtn: string;
  setupPreparing: string;
  setupLanguageLabel: string;

  // Exam Screen
  examQTracker: string;
  examSectionName: string;
  examCorrectScore: string;
  examEndingSoon: string;
  examSubmitBtn: string;
  examPaletteTitle: string;
  examPaletteSub: string;
  examSelectOptionPrompt: string;
  examPrevBtn: string;
  examNextBtn: string;
  examMarkReviewBtn: string;
  examUnmarkReviewBtn: string;
  examClearResponseBtn: string;
  examStatusAnswered: string;
  examStatusNotAnswered: string;
  examStatusMarked: string;
  examModalTitle: string;
  examModalSub: string;
  examModalWarning: string;
  examModalReturnBtn: string;
  examModalConfirmBtn: string;
  examShortcutsPrompt: string;

  // Results Screen
  resultReportTitle: string;
  resultCompletedOn: string;
  resultTotalScore: string;
  resultAccuracy: string;
  resultTimeTaken: string;
  resultAllocated: string;
  resultStatus: string;
  resultCorrectCount: string;
  resultIncorrectCount: string;
  resultUnansweredCount: string;
  resultMarksGained: string;
  resultMarksDeducted: string;
  resultNoPenalty: string;
  resultChapterPerfTitle: string;
  resultChapterPerfSub: string;
  resultStrengthsTitle: string;
  resultAreasTitle: string;
  resultExplanationsTitle: string;
  resultExplanationsSub: string;
  resultOpenFullReviewBtn: string;
  resultYourAnswer: string;
  resultCorrectAnswer: string;
  resultExplanationLabel: string;
  resultTakeawayLabel: string;
  resultNotAttempted: string;
  resultReturnHomeBtn: string;
  resultRetakeBtn: string;
  resultReviewSolutionsBtn: string;

  // Review Screen
  reviewTitle: string;
  reviewSub: string;
  reviewFilterAll: string;
  reviewFilterIncorrect: string;
  reviewFilterCorrect: string;
  reviewFilterUnanswered: string;
  reviewFilterMarked: string;
  reviewEmptyFilter: string;
  reviewStepByStep: string;

  // Footer exact branding
  footerMadeBy: string;
  footerInstitution: string;

  // Language selector
  langEnglish: string;
  langGujarati: string;
  langHindi: string;
  langSelectTitle: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, UIStrings> = {
  en: {
    appName: 'Board Quiz',
    appTagline: 'Prepare smarter. Perform better.',
    appSession: 'CBSE Class XII | Academic Session 2026–27',
    curriculumAdvisoryTitle: 'Curriculum Advisory: ',
    curriculumAdvisoryText: 'Practice questions on this platform are formulated strictly in accordance with the official CBSE Class XII 2026–27 Curriculum Framework (Subject Codes 041, 042, 043). They are intended solely for syllabus practice and do not claim to be official or predicted board question papers.',
    
    // Navigation
    navDashboard: 'Home Dashboard',
    navStartMock: 'Start Mock Test',
    navPracticeChapter: 'Practice by Chapter',
    navQuestionBank: 'Question Bank',
    navResults: 'Results & Analytics',
    navSyllabus: 'CBSE 2026–27 Syllabus',
    navDirectSubjects: 'Direct Subject Tests',
    navResumeTest: 'Resume Active Test',
    navResetAttempts: 'Reset Saved Attempts',
    navResetConfirm: 'Reset all saved mock attempts, scores, and active tests?',
    clearHistoryTitle: 'Clear Quiz History',
    clearHistoryConfirmPrompt: 'Are you sure you want to delete all past test attempts? This will remove your previous scores and performance reports. This action cannot be undone.',
    clearHistoryCancelBtn: 'Cancel',
    clearHistoryConfirmBtn: 'Yes, Clear History',

    // Subjects
    subjectPhysics: 'Physics',
    subjectChemistry: 'Chemistry',
    subjectMathematics: 'Mathematics',
    subjectAll: 'All Subjects',
    subjectPhysicsDesc: 'Mechanics, Electrodynamics, Optics, Modern Physics & Semiconductor Electronics',
    subjectChemistryDesc: 'Physical Chemistry, Inorganic Coordination Chemistry & Organic Functional Groups',
    subjectMathematicsDesc: 'Calculus, Vectors & 3D Geometry, Linear Algebra, Probability & Optimization',

    // Dashboard Metrics
    statAttempted: 'Attempted Tests',
    statAttemptedSub: 'Completed mock attempts',
    statAccuracy: 'Average Accuracy',
    statAccuracySub: 'Correct answer ratio',
    statCumulativeScore: 'Cumulative Score',
    statCumulativeSub: 'Weighted score average',
    statSyllabusScope: 'Syllabus Scope',
    statSyllabusSub: 'CBSE Class 12 Science',
    bestPerformance: 'Best Performance:',
    noTestsRecorded: 'No tests recorded yet',
    startMockBtn: 'Start Full Mock Test',
    byChapterBtn: 'Practice by Chapter',
    syllabusBlueprintBtn: 'Syllabus Blueprint',
    combinedFullTest: 'Combined Full Syllabus Test',
    recentResultsTitle: 'Recent Exam Results',
    recentResultsSub: 'Inspect past answer sheets, scores, and step-by-step verified solutions',
    noAttemptsTitle: 'No mock tests attempted yet',
    noAttemptsSub: 'Select one of the subject modules above to take your first timed mock exam. Your score, accuracy %, and chapter analysis will be saved here automatically.',
    takeFirstMockBtn: 'Take First Mock Test',
    reviewAnswersBtn: 'Review Answers',
    viewFullHistory: 'View Full History',

    // Setup Screen
    setupTitle: 'CBSE Class XII | Exam Configuration',
    setupHeading: 'Configure Your Practice Test',
    setupSubheading: 'Choose your target subject, specific curriculum chapter, question intensity, and time constraints.',
    setupSubjectLabel: '1. Select Subject',
    setupSyllabusLabel: '2. Syllabus Coverage',
    setupFullSyllabus: 'Full Syllabus (Comprehensive Mix)',
    setupSelectChapterPlaceholder: 'Or select individual chapter...',
    setupDifficultyLabel: '3. Difficulty Level',
    setupDiffEasy: 'Easy',
    setupDiffEasySub: 'Direct NCERT',
    setupDiffModerate: 'Moderate',
    setupDiffModerateSub: 'Board Level',
    setupDiffChallenging: 'Challenging',
    setupDiffChallengingSub: 'Higher HOTS',
    setupQuestionsLabel: '4. Number of Questions',
    setupDurationLabel: '5. Duration Limit',
    setupSchemeLabel: '6. Practice Marking Scheme',
    setupSchemeSub: 'Configurable practice rules',
    setupPreSummary: 'Pre-Test Summary',
    setupPatternLabel: 'Single-correct MCQ (Section A pattern)',
    setupSubjectScope: 'Subject / Scope',
    setupQuestionsTime: 'Questions & Time',
    setupMaxMarks: 'Max Possible Marks',
    setupTimerRule: 'Session Timer (Auto-submit on expiry)',
    setupStartBtn: 'Start Mock Test Now',
    setupPreparing: 'Preparing Examination Paper...',
    setupLanguageLabel: 'Select Test Language',

    // Exam Screen
    examQTracker: 'Question',
    examSectionName: 'Section A: Single-Correct MCQ',
    examCorrectScore: 'Marking',
    examEndingSoon: 'Ending Soon',
    examSubmitBtn: 'Submit Test',
    examPaletteTitle: 'Question Palette',
    examPaletteSub: 'Click to jump directly',
    examSelectOptionPrompt: 'Select one option:',
    examPrevBtn: 'Previous',
    examNextBtn: 'Save & Next',
    examMarkReviewBtn: 'Mark for Review',
    examUnmarkReviewBtn: 'Unmark Review',
    examClearResponseBtn: 'Clear Response',
    examStatusAnswered: 'Answered',
    examStatusNotAnswered: 'Not Answered',
    examStatusMarked: 'Marked for Review',
    examModalTitle: 'Submit Examination?',
    examModalSub: 'Review your final question counts before submitting.',
    examModalWarning: 'You have unanswered questions. Unanswered questions will receive 0 marks.',
    examModalReturnBtn: 'Return to Test',
    examModalConfirmBtn: 'Yes, Submit Now',
    examShortcutsPrompt: 'Shortcuts: 1-4 option, R review, → next, ← previous',

    // Results Screen
    resultReportTitle: 'Examination Report',
    resultCompletedOn: 'Completed on',
    resultTotalScore: 'Total Score',
    resultAccuracy: 'Accuracy',
    resultTimeTaken: 'Time Taken',
    resultAllocated: 'Allocated',
    resultStatus: 'Status',
    resultCorrectCount: 'Correct',
    resultIncorrectCount: 'Incorrect',
    resultUnansweredCount: 'Unanswered',
    resultMarksGained: 'marks gained',
    resultMarksDeducted: 'marks deducted',
    resultNoPenalty: 'No penalty',
    resultChapterPerfTitle: 'Chapter & Unit Performance',
    resultChapterPerfSub: 'Detailed breakdown based on syllabus topics tested in this mock exam',
    resultStrengthsTitle: 'Key Strengths Identified',
    resultAreasTitle: 'Target Areas for Revision',
    resultExplanationsTitle: 'Questions & Answer Explanations',
    resultExplanationsSub: 'Review verified answer keys, your responses, and core NCERT concepts',
    resultOpenFullReviewBtn: 'Open Full Interactive Review',
    resultYourAnswer: 'Your Answer:',
    resultCorrectAnswer: 'Correct Answer:',
    resultExplanationLabel: 'Explanation:',
    resultTakeawayLabel: 'Takeaway:',
    resultNotAttempted: 'Not Attempted',
    resultReturnHomeBtn: 'Return to Dashboard',
    resultRetakeBtn: 'Retake This Test',
    resultReviewSolutionsBtn: 'Review Step-by-Step Solutions',

    // Review Screen
    reviewTitle: 'Answer Review & Solutions',
    reviewSub: 'Verified answer keys, mathematical derivations & NCERT concepts',
    reviewFilterAll: 'All Questions',
    reviewFilterIncorrect: 'Incorrect',
    reviewFilterCorrect: 'Correct',
    reviewFilterUnanswered: 'Unanswered',
    reviewFilterMarked: 'Marked for Review',
    reviewEmptyFilter: 'No questions match the selected filter.',
    reviewStepByStep: 'Step-by-Step Verified Solution',

    // Footer exact text
    footerMadeBy: 'Made by Maitrik Ghetiya',
    footerInstitution: 'Quad AI School of Tech',

    // Language selector
    langEnglish: 'English',
    langGujarati: 'ગુજરાતી',
    langHindi: 'हिंदी',
    langSelectTitle: 'Language / ભાષા / भाषा'
  },

  gu: {
    appName: 'Board Quiz',
    appTagline: 'વધુ સમજદારીપૂર્વક તૈયારી કરો. શ્રેષ્ઠ પરિણામ મેળવો.',
    appSession: 'CBSE ધોરણ ૧૨ | શૈક્ષણિક સત્ર ૨૦૨૬–૨૭',
    curriculumAdvisoryTitle: 'અભ્યાસક્રમ માર્ગદર્શિકા: ',
    curriculumAdvisoryText: 'આ પ્લેટફોર્મ પરના તમામ પ્રશ્નો સત્તાવાર CBSE ધોરણ ૧૨ અભ્યાસક્રમ ૨૦૨૬–૨૭ (વિષય કોડ ૦૪૧, ૦૪૨, ૦૪૩) અનુસાર તૈયાર કરવામાં આવ્યા છે. આ પ્રશ્નો ફક્ત અભ્યાસ માટે છે અને તે બોર્ડ પરીક્ષાના અનુમાનિત પ્રશ્નપત્રો નથી.',
    
    // Navigation
    navDashboard: 'હોમ ડેશબોર્ડ',
    navStartMock: 'મોક ટેસ્ટ શરૂ કરો',
    navPracticeChapter: 'પ્રકરણ મુજબ અભ્યાસ',
    navQuestionBank: 'પ્રશ્ન બેંક',
    navResults: 'પરિણામો અને વિશ્લેષણ',
    navSyllabus: 'CBSE ૨૦૨૬–૨૭ અભ્યાસક્રમ',
    navDirectSubjects: 'વિષયવાર ટેસ્ટ',
    navResumeTest: 'ચાલુ ટેસ્ટ પર પાછા જાઓ',
    navResetAttempts: 'સાચવેલ સ્કોર્સ રીસેટ કરો',
    navResetConfirm: 'શું તમે સાચવેલા તમામ મોક ટેસ્ટ અને સ્કોર્સ રીસેટ કરવા માંગો છો?',
    clearHistoryTitle: 'ક્વિઝ ઇતિહાસ સાફ કરો',
    clearHistoryConfirmPrompt: 'શું તમે ખરેખર તમારા તમામ ભૂતકાળના ટેસ્ટ પરિણામો કાઢી નાખવા માંગો છો? આનાથી તમારા અગાઉના સ્કોર્સ અને રિપોર્ટ્સ હટી જશે. આ ક્રિયા પૂર્વવત્ કરી શકાતી નથી.',
    clearHistoryCancelBtn: 'રદ કરો',
    clearHistoryConfirmBtn: 'હા, ઇતિહાસ સાફ કરો',

    // Subjects
    subjectPhysics: 'ભૌતિક વિજ્ઞાન (Physics)',
    subjectChemistry: 'રસાયણ વિજ્ઞાન (Chemistry)',
    subjectMathematics: 'ગણિત (Mathematics)',
    subjectAll: 'તમામ વિષયો (All Subjects)',
    subjectPhysicsDesc: 'વિદ્યુતશાસ્ત્ર, ચુંબકત્વ, પ્રકાશીય વિજ્ઞાન, આધુનિક ભૌતિકશાસ્ત્ર અને સેમિકન્ડક્ટર્સ',
    subjectChemistryDesc: 'દ્રાવણો, વિદ્યુતરસાયણ, રાસાયણિક ગતિકી, સંકીર્ણ સંયોજનો અને કાર્બનિક રસાયણશાસ્ત્ર',
    subjectMathematicsDesc: 'કલનશાસ્ત્ર (Calculus), સદિશ અને ત્રિ-પરિમાણીય ભૂમિતિ, શ્રેણિક અને સંભાવના',

    // Dashboard Metrics
    statAttempted: 'આપેલ ટેસ્ટ',
    statAttemptedSub: 'પૂર્ણ કરેલ મોક ટેસ્ટ',
    statAccuracy: 'સરેરાશ સચોટતા',
    statAccuracySub: 'સાચા જવાબોની ટકાવારી',
    statCumulativeScore: 'કુલ સ્કોર',
    statCumulativeSub: 'કુલ સરેરાશ સ્કોર',
    statSyllabusScope: 'અભ્યાસક્રમ વ્યાપ',
    statSyllabusSub: 'CBSE ધોરણ ૧૨ સાયન્સ',
    bestPerformance: 'શ્રેષ્ઠ પ્રદર્શન:',
    noTestsRecorded: 'હજી સુધી કોઈ ટેસ્ટ આપેલ નથી',
    startMockBtn: 'સંપૂર્ણ મોક ટેસ્ટ શરૂ કરો',
    byChapterBtn: 'પ્રકરણ મુજબ પ્રેક્ટિસ',
    syllabusBlueprintBtn: 'અભ્યાસક્રમ બ્લુપ્રિન્ટ',
    combinedFullTest: 'તમામ વિષયોની સંયુક્ત ટેસ્ટ',
    recentResultsTitle: 'તાજેતરના પરીક્ષા પરિણામો',
    recentResultsSub: 'તમારા ભૂતકાળના જવાબો, સ્કોર અને વિગતવાર સોલ્યુશન જુઓ',
    noAttemptsTitle: 'હજી સુધી કોઈ મોક ટેસ્ટ આપેલ નથી',
    noAttemptsSub: 'સમયબદ્ધ મોક ટેસ્ટ શરૂ કરવા માટે ઉપર આપેલા વિષયોમાંથી કોઈપણ એક પસંદ કરો. તમારો સ્કોર અને પ્રકરણવાર વિશ્લેષણ અહીં સાચવવામાં આવશે.',
    takeFirstMockBtn: 'પ્રથમ મોક ટેસ્ટ આપો',
    reviewAnswersBtn: 'જવાબો તપાસો',
    viewFullHistory: 'સંપૂર્ણ ઇતિહાસ જુઓ',

    // Setup Screen
    setupTitle: 'CBSE ધોરણ ૧૨ | ટેસ્ટ રૂપરેખાંકન',
    setupHeading: 'તમારી પ્રેક્ટિસ ટેસ્ટ કસ્ટમાઇઝ કરો',
    setupSubheading: 'તમારો વિષય, ચોક્કસ પ્રકરણ, મુશ્કેલી સ્તર અને સમય મર્યાદા પસંદ કરો.',
    setupSubjectLabel: '૧. વિષય પસંદ કરો',
    setupSyllabusLabel: '૨. અભ્યાસક્રમ વ્યાપ',
    setupFullSyllabus: 'સંપૂર્ણ અભ્યાસક્રમ (તમામ પ્રકરણો)',
    setupSelectChapterPlaceholder: 'અથવા ચોક્કસ પ્રકરણ પસંદ કરો...',
    setupDifficultyLabel: '૩. મુશ્કેલી સ્તર',
    setupDiffEasy: 'સરળ (Easy)',
    setupDiffEasySub: 'સીધા NCERT આધારિત',
    setupDiffModerate: 'મધ્યમ (Moderate)',
    setupDiffModerateSub: 'બોર્ડ કક્ષાનું',
    setupDiffChallenging: 'પડકારજનક (HOTS)',
    setupDiffChallengingSub: 'ઉચ્ચ વિચાર કક્ષા',
    setupQuestionsLabel: '૪. પ્રશ્નોની સંખ્યા',
    setupDurationLabel: '૫. સમય મર્યાદા',
    setupSchemeLabel: '૬. ગુણાંક પદ્ધતિ',
    setupSchemeSub: 'પ્રેક્ટિસ માટે નિયમો',
    setupPreSummary: 'ટેસ્ટ પૂર્વેનો સારાંશ',
    setupPatternLabel: 'એકલ-સાચો વિકલ્પ MCQ (વિભાગ-A)',
    setupSubjectScope: 'વિષય / વ્યાપ',
    setupQuestionsTime: 'પ્રશ્નો અને સમય',
    setupMaxMarks: 'મહત્તમ ગુણ',
    setupTimerRule: 'સમય પૂર્ણ થતાં આપોઆપ સબમિટ થશે',
    setupStartBtn: 'મોક ટેસ્ટ હમણાં શરૂ કરો',
    setupPreparing: 'પ્રશ્નપત્ર તૈયાર થઈ રહ્યું છે...',
    setupLanguageLabel: 'ટેસ્ટ ભાષા પસંદ કરો',

    // Exam Screen
    examQTracker: 'પ્રશ્ન',
    examSectionName: 'વિભાગ A: એકલ-પસંદગી MCQ',
    examCorrectScore: 'ગુણ',
    examEndingSoon: 'સમય સમાપ્ત થવાની નજીક',
    examSubmitBtn: 'ટેસ્ટ સબમિટ કરો',
    examPaletteTitle: 'પ્રશ્ન પૅલેટ (Palette)',
    examPaletteSub: 'કોઈપણ પ્રશ્ન પર જવા માટે ક્લિક કરો',
    examSelectOptionPrompt: 'યોગ્ય વિકલ્પ પસંદ કરો:',
    examPrevBtn: 'પાછળ',
    examNextBtn: 'સાચવો અને આગળ',
    examMarkReviewBtn: 'સમીક્ષા માટે ચિહ્નિત કરો',
    examUnmarkReviewBtn: 'ચિહ્ન દૂર કરો',
    examClearResponseBtn: 'પસંદગી સાફ કરો',
    examStatusAnswered: 'ઉત્તર આપેલ',
    examStatusNotAnswered: 'ઉત્તર આપેલ નથી',
    examStatusMarked: 'સમીક્ષા માટે ચિહ્નિત',
    examModalTitle: 'પરીક્ષા સબમિટ કરવી છે?',
    examModalSub: 'સબમિટ કરતા પહેલા તમારા પ્રશ્નોની ગણતરી ચકાસી લો.',
    examModalWarning: 'તમારા કેટલાક પ્રશ્નો અનુત્તરિત છે. અનુત્તરિત પ્રશ્નો માટે ૦ ગુણ મળશે.',
    examModalReturnBtn: 'ટેસ્ટ પર પાછા જાઓ',
    examModalConfirmBtn: 'હા, હમણાં સબમિટ કરો',
    examShortcutsPrompt: 'કીબોર્ડ શોર્ટકટ્સ: ૧-૪ વિકલ્પ, R સમીક્ષા, → આગળ, ← પાછળ',

    // Results Screen
    resultReportTitle: 'પરીક્ષા પરિણામ અહેવાલ',
    resultCompletedOn: 'પૂર્ણ તારીખ:',
    resultTotalScore: 'કુલ સ્કોર',
    resultAccuracy: 'સચોટતા',
    resultTimeTaken: 'લીધેલ સમય',
    resultAllocated: 'ફાળવેલ',
    resultStatus: 'સ્થિતિ',
    resultCorrectCount: 'સાચા',
    resultIncorrectCount: 'ખોટા',
    resultUnansweredCount: 'અનુત્તરિત',
    resultMarksGained: 'ગુણ મળ્યા',
    resultMarksDeducted: 'ગુણ કપાયા',
    resultNoPenalty: 'કોઈ નેગેટિવ માર્કિંગ નથી',
    resultChapterPerfTitle: 'પ્રકરણ અને એકમ મુજબ પરિણામ',
    resultChapterPerfSub: 'આ મોક ટેસ્ટમાં ચકાસાયેલ વિષયોનું વિગતવાર વિશ્લેષણ',
    resultStrengthsTitle: 'તમારા મજબૂત વિષયો',
    resultAreasTitle: 'સુધારણા માટેના વિષયો',
    resultExplanationsTitle: 'પ્રશ્નો અને જવાબોની સમજૂતી',
    resultExplanationsSub: 'સત્તાવાર ઉત્તર કૂંચી અને NCERT સંકલ્પનાઓની વિગતવાર સમજૂતી',
    resultOpenFullReviewBtn: 'સંપૂર્ણ ઇન્ટરેક્ટિવ સમીક્ષા ખોલો',
    resultYourAnswer: 'તમારો ઉત્તર:',
    resultCorrectAnswer: 'સાચો ઉત્તર:',
    resultExplanationLabel: 'સમજૂતી:',
    resultTakeawayLabel: 'મુખ્ય સિદ્ધાંત:',
    resultNotAttempted: 'અનુત્તરિત',
    resultReturnHomeBtn: 'ડેશબોર્ડ પર પાછા જાઓ',
    resultRetakeBtn: 'આ ટેસ્ટ ફરીથી આપો',
    resultReviewSolutionsBtn: 'સ્ટેપ-બાય-સ્ટેપ સોલ્યુશન્સ જુઓ',

    // Review Screen
    reviewTitle: 'જવાબોની સમીક્ષા અને સોલ્યુશન',
    reviewSub: 'ચકાસાયેલ ઉત્તરો, ગાણિતિક ગણતરીઓ અને NCERT નિયમો',
    reviewFilterAll: 'તમામ પ્રશ્નો',
    reviewFilterIncorrect: 'ખોટા જવાબો',
    reviewFilterCorrect: 'સાચા જવાબો',
    reviewFilterUnanswered: 'અનુત્તરિત',
    reviewFilterMarked: 'સમીક્ષા માટે ચિહ્નિત',
    reviewEmptyFilter: 'પસંદ કરેલ ફિલ્ટર મુજબ કોઈ પ્રશ્ન મળ્યા નથી.',
    reviewStepByStep: 'સ્ટેપ-બાય-સ્ટેપ ચકાસાયેલ સોલ્યુશન',

    // Footer exact text
    footerMadeBy: 'Made by Maitrik Ghetiya',
    footerInstitution: 'Quad AI School of Tech',

    // Language selector
    langEnglish: 'English',
    langGujarati: 'ગુજરાતી',
    langHindi: 'हिंदी',
    langSelectTitle: 'ભાષા પસંદ કરો'
  },

  hi: {
    appName: 'Board Quiz',
    appTagline: 'अधिक समझदारी से तैयारी करें। बेहतर परिणाम प्राप्त करें।',
    appSession: 'CBSE कक्षा १२ | शैक्षणिक सत्र २०२६–२७',
    curriculumAdvisoryTitle: 'पाठ्यक्रम निर्देशिका: ',
    curriculumAdvisoryText: 'इस मंच पर दिए गए सभी अभ्यास प्रश्न आधिकारिक CBSE कक्षा १२ पाठ्यक्रम २०२६–२७ (विषय कोड ०४१, ०४२, ०४३) के अनुसार तैयार किए गए हैं। ये केवल अभ्यास के लिए हैं और बोर्ड परीक्षा के आधिकारिक या अनुमानित प्रश्नपत्र नहीं हैं।',
    
    // Navigation
    navDashboard: 'होम डैशबोर्ड',
    navStartMock: 'मॉक टेस्ट शुरू करें',
    navPracticeChapter: 'अध्याय अनुसार अभ्यास',
    navQuestionBank: 'प्रश्न बैंक',
    navResults: 'परिणाम और विश्लेषण',
    navSyllabus: 'CBSE २०२६–२७ पाठ्यक्रम',
    navDirectSubjects: 'विषयवार टेस्ट',
    navResumeTest: 'सक्रिय टेस्ट जारी रखें',
    navResetAttempts: 'सहेजे गए टेस्ट रीसेट करें',
    navResetConfirm: 'क्या आप सभी सहेजे गए मॉक टेस्ट और रिकॉर्ड रीसेट करना चाहते हैं?',
    clearHistoryTitle: 'क्विज़ इतिहास साफ़ करें',
    clearHistoryConfirmPrompt: 'क्या आप वाकई अपने सभी पिछले टेस्ट परिणाम हटाना चाहते हैं? इससे आपके पूर्व स्कोर और रिपोर्ट्स हट जाएंगे। यह क्रिया पूर्ववत नहीं की जा सकती।',
    clearHistoryCancelBtn: 'रद्द करें',
    clearHistoryConfirmBtn: 'हाँ, इतिहास साफ़ करें',

    // Subjects
    subjectPhysics: 'भौतिक विज्ञान (Physics)',
    subjectChemistry: 'रसायन विज्ञान (Chemistry)',
    subjectMathematics: 'गणित (Mathematics)',
    subjectAll: 'सभी विषय (All Subjects)',
    subjectPhysicsDesc: 'वैद्युतिकी, चुंबकत्व, प्रकाशिकी, आधुनिक भौतिकी और सेमीकंडक्टर इलेक्ट्रॉनिक्स',
    subjectChemistryDesc: 'विलयन, वैद्युतरसायन, रासायनिक बलगतिकी, उपसहसंयोजन यौगिक और कार्बनिक रसायन',
    subjectMathematicsDesc: 'कलन (Calculus), सदिश और त्रिविमीय ज्यामिति, आव्यूह और प्रायिकता',

    // Dashboard Metrics
    statAttempted: 'दिए गए टेस्ट',
    statAttemptedSub: 'पूर्ण किए गए मॉक टेस्ट',
    statAccuracy: 'औसत सटीकता',
    statAccuracySub: 'सही उत्तरों का अनुपात',
    statCumulativeScore: 'कुल स्कोर',
    statCumulativeSub: 'औसत स्कोर प्रतिशत',
    statSyllabusScope: 'पाठ्यक्रम दायरा',
    statSyllabusSub: 'CBSE कक्षा १२ विज्ञान',
    bestPerformance: 'सर्वश्रेष्ठ प्रदर्शन:',
    noTestsRecorded: 'अभी तक कोई टेस्ट नहीं दिया गया',
    startMockBtn: 'पूर्ण मॉक टेस्ट शुरू करें',
    byChapterBtn: 'अध्याय अनुसार अभ्यास करें',
    syllabusBlueprintBtn: 'पाठ्यक्रम ब्लूप्रिंट',
    combinedFullTest: 'संयुक्त पूर्ण पाठ्यक्रम टेस्ट',
    recentResultsTitle: 'हाल के परीक्षा परिणाम',
    recentResultsSub: 'अपने पिछले उत्तर, स्कोर और चरणबद्ध समाधान देखें',
    noAttemptsTitle: 'अभी तक कोई मॉक टेस्ट नहीं दिया गया',
    noAttemptsSub: 'समयबद्ध मॉक टेस्ट शुरू करने के लिए ऊपर दिए गए विषयों में से किसी एक को चुनें। आपका स्कोर और अध्यायवार विश्लेषण यहाँ स्वतः सहेजा जाएगा।',
    takeFirstMockBtn: 'पहला मॉक टेस्ट दें',
    reviewAnswersBtn: 'उत्तरों की समीक्षा करें',
    viewFullHistory: 'पूरा इतिहास देखें',

    // Setup Screen
    setupTitle: 'CBSE कक्षा १२ | टेस्ट विन्यास',
    setupHeading: 'अपना अभ्यास टेस्ट कॉन्फ़िगर करें',
    setupSubheading: 'अपना लक्षित विषय, विशिष्ट अध्याय, कठिनाई स्तर और समय सीमा चुनें।',
    setupSubjectLabel: '१. विषय चुनें',
    setupSyllabusLabel: '२. पाठ्यक्रम कवरेज',
    setupFullSyllabus: 'पूर्ण पाठ्यक्रम (सभी अध्याय)',
    setupSelectChapterPlaceholder: 'या कोई विशेष अध्याय चुनें...',
    setupDifficultyLabel: '३. कठिनाई स्तर',
    setupDiffEasy: 'सरल (Easy)',
    setupDiffEasySub: 'सीधे NCERT आधारित',
    setupDiffModerate: 'मध्यम (Moderate)',
    setupDiffModerateSub: 'बोर्ड स्तर',
    setupDiffChallenging: 'चुनौतीपूर्ण (HOTS)',
    setupDiffChallengingSub: 'उच्च विचार स्तर',
    setupQuestionsLabel: '४. प्रश्नों की संख्या',
    setupDurationLabel: '५. समय सीमा',
    setupSchemeLabel: '६. अंकन योजना',
    setupSchemeSub: 'अभ्यास हेतु नियम',
    setupPreSummary: 'टेस्ट पूर्व सारांश',
    setupPatternLabel: 'एकल-सही विकल्प MCQ (खंड-A प्रारूप)',
    setupSubjectScope: 'विषय / दायरा',
    setupQuestionsTime: 'प्रश्न और समय',
    setupMaxMarks: 'अधिकतम अंक',
    setupTimerRule: 'समय समाप्त होने पर स्वतः सबमिट होगा',
    setupStartBtn: 'मॉक टेस्ट अभी शुरू करें',
    setupPreparing: 'प्रश्नपत्र तैयार किया जा रहा है...',
    setupLanguageLabel: 'टेस्ट की भाषा चुनें',

    // Exam Screen
    examQTracker: 'प्रश्न',
    examSectionName: 'खंड A: एकल-विकल्प MCQ',
    examCorrectScore: 'अंक',
    examEndingSoon: 'समय समाप्त होने वाला है',
    examSubmitBtn: 'टेस्ट सबमिट करें',
    examPaletteTitle: 'प्रश्न पैलेट (Palette)',
    examPaletteSub: 'सीधे जाने के लिए क्लिक करें',
    examSelectOptionPrompt: 'सही विकल्प चुनें:',
    examPrevBtn: 'पिछला',
    examNextBtn: 'सहेजें और आगे',
    examMarkReviewBtn: 'समीक्षा के लिए चिह्नित करें',
    examUnmarkReviewBtn: 'चिह्न हटाएं',
    examClearResponseBtn: 'उत्तर साफ़ करें',
    examStatusAnswered: 'उत्तर दिया',
    examStatusNotAnswered: 'उत्तर नहीं दिया',
    examStatusMarked: 'समीक्षा के लिए चिह्नित',
    examModalTitle: 'परीक्षा सबमिट करें?',
    examModalSub: 'सबमिट करने से पहले अपने कुल प्रश्नों की स्थिति देख लें।',
    examModalWarning: 'आपके कुछ प्रश्न अनुत्तरित हैं। अनुत्तरित प्रश्नों के लिए ० अंक दिए जाएंगे।',
    examModalReturnBtn: 'टेस्ट पर वापस जाएं',
    examModalConfirmBtn: 'हाँ, अभी सबमिट करें',
    examShortcutsPrompt: 'शॉर्टकट: १-४ विकल्प, R समीक्षा, → अगला, ← पिछला',

    // Results Screen
    resultReportTitle: 'परीक्षा परिणाम रिपोर्ट',
    resultCompletedOn: 'पूर्ण होने की तिथि:',
    resultTotalScore: 'कुल अंक',
    resultAccuracy: 'सटीकता',
    resultTimeTaken: 'लिया गया समय',
    resultAllocated: 'निर्धारित',
    resultStatus: 'स्थिति',
    resultCorrectCount: 'सही',
    resultIncorrectCount: 'गलत',
    resultUnansweredCount: 'अनुत्तरित',
    resultMarksGained: 'अंक प्राप्त',
    resultMarksDeducted: 'अंक कटे',
    resultNoPenalty: 'कोई नकारात्मक अंकन नहीं',
    resultChapterPerfTitle: 'अध्याय और इकाई अनुसार प्रदर्शन',
    resultChapterPerfSub: 'इस मॉक टेस्ट में पूछे गए पाठ्यक्रम विषयों का विस्तृत विश्लेषण',
    resultStrengthsTitle: 'मजबूत विषय',
    resultAreasTitle: 'पुनरावृत्ति हेतु लक्षित क्षेत्र',
    resultExplanationsTitle: 'प्रश्न और उत्तरों की व्याख्या',
    resultExplanationsSub: 'आधिकारिक उत्तर कुंजी और NCERT अवधारणाओं की विस्तृत व्याख्या',
    resultOpenFullReviewBtn: 'पूर्ण इंटरएक्टिव समीक्षा खोलें',
    resultYourAnswer: 'आपका उत्तर:',
    resultCorrectAnswer: 'सही उत्तर:',
    resultExplanationLabel: 'व्याख्या:',
    resultTakeawayLabel: 'मुख्य सिद्धांत:',
    resultNotAttempted: 'अनुत्तरित',
    resultReturnHomeBtn: 'डैशबोर्ड पर वापस जाएं',
    resultRetakeBtn: 'यह टेस्ट दोबारा दें',
    resultReviewSolutionsBtn: 'चरणबद्ध समाधान देखें',

    // Review Screen
    reviewTitle: 'उत्तर समीक्षा और समाधान',
    reviewSub: 'सत्यापित उत्तर, गणितीय गणनाएं और NCERT सिद्धांत',
    reviewFilterAll: 'सभी प्रश्न',
    reviewFilterIncorrect: 'गलत उत्तर',
    reviewFilterCorrect: 'सही उत्तर',
    reviewFilterUnanswered: 'अनुत्तरित',
    reviewFilterMarked: 'समीक्षा के लिए चिह्नित',
    reviewEmptyFilter: 'चयनित फ़िल्टर के अनुसार कोई प्रश्न नहीं मिला।',
    reviewStepByStep: 'चरणबद्ध सत्यापित समाधान',

    // Footer exact text
    footerMadeBy: 'Made by Maitrik Ghetiya',
    footerInstitution: 'Quad AI School of Tech',

    // Language selector
    langEnglish: 'English',
    langGujarati: 'ગુજરાતી',
    langHindi: 'हिंदी',
    langSelectTitle: 'भाषा चुनें'
  }
};
