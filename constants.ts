import { Article, LawyerProfile, Translation } from './types';

export const TRANSLATIONS: Translation = {
  // Navigation
  navHome: { en: 'Home', fr: 'Accueil' },
  navArticles: { en: 'Archives & Editions', fr: 'Archives & Éditions' },
  navProfile: { en: 'Editorial Board', fr: 'Comité de Rédaction' },
  navSubmit: { en: 'Submit Paper', fr: 'Soumettre un Article' },
  navAdmin: { en: 'Admin Portal', fr: 'Portail Admin' },
  navContact: { en: 'Contact', fr: 'Contact' },
  changeLanguage: { en: 'Change Language', fr: 'Changer de langue' },

  // General / Hero
  heroTitle: { en: 'African Social Sciences Review', fr: 'Revue Africaine des Sciences Sociales' },
  heroSubtitle: { en: 'A monthly review of social analysis dedicated to exploring social phenomena across the African continent.', fr: 'Une revue mensuelle d’analyse sociale qui explore les phénomènes sociaux en Afrique.' },
  heroCta: { en: 'Read Current Edition', fr: 'Lire l\'Édition Actuelle' },
  issnLabel: { en: 'Monthly Journal • ISSN 2304-xxxx', fr: 'Revue Mensuelle • ISSN 2304-xxxx' },
  
  // Home Page
  aboutFirm: { en: 'Scientific Rigor & Local Insight', fr: 'Rigueur Scientifique & Ancrage Local' },
  aboutFirmText: { 
    en: 'Published monthly, the Review brings together academics, legal practitioners, and sociologists to dissect the dynamics shaping our societies. From Douala to the wider CEMAC region, we provide a platform for intellectual discourse.',
    fr: 'Publiée mensuellement, la Revue rassemble universitaires, praticiens du droit et sociologues pour décortiquer les dynamiques qui façonnent nos sociétés. De Douala à la région CEMAC, nous offrons une tribune pour le discours intellectuel.'
  },
  socialSciences: { en: 'Social Sciences', fr: 'Sciences Sociales' },
  politicalScience: { en: 'Political Science', fr: 'Sciences Politiques' },
  juridicalLaw: { en: 'Juridical Law', fr: 'Droit Juridique' },
  anthropology: { en: 'Anthropology', fr: 'Anthropologie' },
  latestArticles: { en: 'In This Issue', fr: 'Dans Cette Édition' },
  viewAll: { en: 'View Archives', fr: 'Voir les Archives' },
  featuredPaper: { en: 'Featured Paper', fr: 'Article en Vedette' },
  readFull: { en: 'Read Full Paper', fr: 'Lire l\'Article' },
  read: { en: 'Read', fr: 'Lire' },
  readTime: { en: 'read', fr: 'de lecture' },
  viewContents: { en: 'View Full Table of Contents', fr: 'Voir la Table des Matières' },

  // Articles Page
  journalArchives: { en: 'Journal Archives', fr: 'Archives de la Revue' },
  archivesDesc: { en: 'Browse past editions and monthly issues of the African Social Sciences Review.', fr: 'Parcourez les éditions passées et les numéros mensuels de la Revue Africaine des Sciences Sociales.' },
  callForPapersCaps: { en: 'Call for Papers', fr: 'Appel à Contributions' },
  articleCtaTitle: { en: 'Publish With Us', fr: 'Publiez Avec Nous' },
  joinNetwork: { en: 'Join our network of legal professionals and academics. Submit your articles for review.', fr: 'Rejoignez notre réseau de professionnels du droit et d\'universitaires. Soumettez vos articles pour révision.' },
  articleCtaBtn: { en: 'Submission Guidelines', fr: 'Directives de Soumission' },
  searchPlaceholder: { en: 'Search archives...', fr: 'Rechercher dans les archives...' },
  volumeEdition: { en: 'Volume / Edition', fr: 'Volume / Édition' },
  readAbstract: { en: 'Read Abstract', fr: 'Lire le Résumé' },
  downloadBtn: { en: 'Download PDF', fr: 'Télécharger PDF' },
  noResults: { en: 'No articles found matching your criteria.', fr: 'Aucun article trouvé correspondant à vos critères.' },

  // Profile Page
  yearsExp: { en: 'Years Exp.', fr: 'Ans d\'Exp.' },
  seniorPartner: { en: 'Senior Partner', fr: 'Associé Principal' },
  scheduleConsultation: { en: 'Schedule Consultation', fr: 'Prendre Rendez-vous' },
  aboutMe: { en: 'About Me', fr: 'À propos de moi' },
  areasExpertise: { en: 'Areas of Expertise', fr: 'Domaines d\'expertise' },
  credentials: { en: 'Credentials', fr: 'Titres et Certifications' },
  doualaHq: { en: 'Douala HQ', fr: 'Siège Douala' },
  getDirections: { en: 'Get Directions', fr: 'Obtenir l\'itinéraire' },

  // Admin Page
  adminDashboard: { en: 'Editorial Dashboard', fr: 'Tableau de Bord Éditorial' },
  accessCode: { en: 'Access Code', fr: 'Code d\'Accès' },
  login: { en: 'Login', fr: 'Connexion' },
  cancel: { en: 'Cancel', fr: 'Annuler' },
  protectedStandard: { en: 'Protected by Industry Standards', fr: 'Protégé par les normes de l\'industrie' },
  incorrectPass: { en: 'Incorrect password', fr: 'Mot de passe incorrect' },
  welcomeAdmin: { en: 'Welcome back to the Editorial workspace.', fr: 'Bienvenue dans l\'espace éditorial.' },
  overview: { en: 'Overview', fr: 'Aperçu' },
  readers: { en: 'Readers', fr: 'Lecteurs' },
  papersPublished: { en: 'Papers Published', fr: 'Articles Publiés' },
  inLibrary: { en: 'In Library', fr: 'Dans la Bibliothèque' },
  pendingReview: { en: 'Pending Review', fr: 'En Attente de Révision' },
  urgent: { en: 'Urgent', fr: 'Urgent' },
  weeklyEngagement: { en: 'Weekly Engagement', fr: 'Engagement Hebdomadaire' },
  publishedDocs: { en: 'Published Documents', fr: 'Documents Publiés' },
  uploadNew: { en: 'Upload New Document', fr: 'Télécharger Nouveau Document' },
  uploadSuccessMsg: { en: 'Document Updated Successfully!', fr: 'Document Mis à Jour avec Succès !' },
  enterAuthor: { en: 'Enter author name', fr: 'Entrez le nom de l\'auteur' },
  enterTitle: { en: 'Enter article title', fr: 'Entrez le titre de l\'article' },
  datePublished: { en: 'Date Published', fr: 'Date de Publication' },
  uploadPdf: { en: 'Upload PDF', fr: 'Télécharger PDF' },
  clickUploadPdf: { en: 'Click to upload PDF', fr: 'Cliquez pour télécharger le PDF' },
  pdfReady: { en: 'PDF READY', fr: 'PDF PRÊT' },
  publishLib: { en: 'Publish to Library', fr: 'Publier dans la Bibliothèque' },
  backToSite: { en: 'Back to Site', fr: 'Retour au Site' },
  logout: { en: 'Logout', fr: 'Déconnexion' },
  navDashboard: { en: 'Dashboard', fr: 'Tableau de Bord' },
  navAdminArticles: { en: 'Manage Reviews', fr: 'Gérer les Revues' },
  
  // Submit Page
  submitHeroTitle: { en: 'Call for Papers', fr: 'Appel à Contributions' },
  submitHeroSubtitle: { en: 'Permanent call for monthly issues. Submit your research today.', fr: 'Appel permanent pour les numéros mensuels. Soumettez votre recherche aujourd\'hui.' },
  editorialPolicyTitle: { en: 'Editorial Policy & Submission Guidelines', fr: 'Politique de Rédaction & Directives' },
  epIntro: {
    en: 'The Review maintains a permanent call for papers for its monthly issues. Contributions are accepted in English and French.',
    fr: 'La Revue lance un appel à contribution permanent pour ses numéros mensuels. Elle reçoit les contributions en français et en anglais.'
  },
  epFormatTitle: { en: 'Formatting Rules', fr: 'Règles de Formatage' },
  epFormatDesc: {
    en: 'Word format only. Max 35 pages. Times New Roman, size 12, 1.5 line spacing. Must include an abstract.',
    fr: 'Format Word uniquement. 35 pages max. Police Times New Roman, taille 12, interligne 1,5. Doit inclure un résumé.'
  },
  epReviewTitle: { en: 'Evaluation Process', fr: 'Processus d\'Évaluation' },
  epReviewDesc: {
    en: 'Evaluation is based on originality, exclusivity, and scientific rigor. Anonymous review by 3 evaluators (min. 2 favorable for publication). Plagiarism results in immediate withdrawal.',
    fr: 'L\'évaluation repose sur l\'originalité, l\'exclusivité et la scientificité. Évaluation anonyme par 3 évaluateurs (min. 2 favorables). Tout plagiat entraîne le retrait immédiat.'
  },
  epDeadlineTitle: { en: 'Submission Deadlines', fr: 'Délais de Soumission' },
  epDeadlineDesc: {
    en: 'Deadline: 20th of each month. Submissions received after this date are considered for the following month.',
    fr: 'Date limite : le 20 de chaque mois. Toute soumission au-delà de cette date sera prise en compte pour le mois suivant.'
  },
  submitName: { en: 'Author / Researcher', fr: 'Auteur / Chercheur' },
  submitContact: { en: 'Institutional Email', fr: 'Email Institutionnel' },
  submitTopic: { en: 'Paper Title', fr: 'Titre de l\'Article' },
  submitFile: { en: 'Attachment Instruction', fr: 'Instruction pour Pièce Jointe' },
  submitBtn: { en: 'Proceed to Email', fr: 'Continuer vers l\'Email' },
  submitNote: { en: 'Note: Submissions must be in Word format. Clicking proceed will open your email client.', fr: 'Note : Les soumissions doivent être au format Word. Cliquer sur continuer ouvrira votre messagerie.' },
  emailRedirectTitle: { en: 'Attach File in Email', fr: 'Joindre le Fichier dans l\'Email' },
  emailRedirectInfo: {
    en: 'We do not accept direct uploads on this server. Clicking "Proceed" will open your default email app with the subject line pre-filled. Please attach your Word document to that email manually.',
    fr: 'Nous n\'acceptons pas de téléchargements directs sur ce serveur. Cliquer sur "Continuer" ouvrira votre application de messagerie par défaut avec l\'objet pré-rempli. Veuillez joindre manuellement votre document Word à cet email.'
  },
  sendTo: { en: 'Send to:', fr: 'Envoyer à :' },
  wordDocOnly: { en: 'Word Document Only', fr: 'Document Word Uniquement' },
  
  // Admin Table
  adminTableTitle: { en: 'Title', fr: 'Titre' },
  adminTableCategory: { en: 'Edition', fr: 'Édition' },
  adminTableDate: { en: 'Date', fr: 'Date' },
  adminTableActions: { en: 'Actions', fr: 'Actions' },
  adminDelete: { en: 'Delete', fr: 'Supprimer' },
  adminEdit: { en: 'Edit', fr: 'Modifier' },
  adminEmpty: { en: 'No reviews found.', fr: 'Aucune revue trouvée.' },

  // Footer
  contactTitle: { en: 'Contact Secretariat', fr: 'Contacter le Secrétariat' },
  doualaOffice: { en: 'Douala Office', fr: 'Bureau de Douala' },
  yaoundeOffice: { en: 'Yaoundé Office', fr: 'Bureau de Yaoundé' },
  rightsReserved: { en: 'All Rights Reserved.', fr: 'Tous Droits Réservés.' },
  
  // Others
  generateIdea: { en: 'Topic Assistant', fr: 'Assistant Sujet' },
};

// A small valid PDF base64 string for demonstration purposes
export const SAMPLE_PDF = "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmogCjw8CiAgL1R5cGUgL1BhZ2VzCiAgL01lZGlhQm94IFsgMCAwIDIwMCAyMDAgXQogIC9Db3VudCAxCiAgL0tpZHMgWyAzIDAgUiBdCj4+CmVuZG9iagoKMyAwIG9iago8PAogIC9VHlwZSAvUGFnZQogIC9QYXJlbnQgMiAwIFIKICAvUmVzb3VyY2VzIDw8CiAgICAvRm9udCA8PAogICAgICAvRjEgNCAwIFIKICAgID4+CiAgPj4KICAvQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCgo0IDAgb2JqCjw8CiAgL1R5cGUgL0ZvbnQKICAvU3VidHlwZSAvVHlwZTEKICAvQmFzZUZvbnQgL1RpbWVzLVJvbWFuCj4+CmVuZG9iagoKNSAwIG9iago8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDE1NyAwMDAwMCBuIAowMDAwMDAwMjU1IDAwMDAwIG4gCjAwMDAwMDAzNDQgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDQ5CiUlRU9GCg==";


export const LAWYER_PROFILE: LawyerProfile = {
  name: 'Dr. Eleanor Sterling, PhD',
  title: { en: 'Editor-in-Chief | RASS', fr: 'Rédactrice en Chef | RASS' },
  yearsExperience: 18,
  bio: {
    en: 'Dr. Eleanor Sterling is the founder of the Revue Africaine des Sciences Sociales. With a PhD in Political Science and Law, she has dedicated her career to fostering academic research in Central Africa. She oversees the editorial direction of the journal.',
    fr: 'Dr. Eleanor Sterling est la fondatrice de la Revue Africaine des Sciences Sociales. Titulaire d\'un doctorat en sciences politiques et en droit, elle a consacré sa carrière à la promotion de la recherche universitaire en Afrique centrale. Elle supervise la direction éditoriale de la revue.'
  },
  specialties: [
    {
      icon: 'BookOpen',
      title: { en: 'Academic Review', fr: 'Revue Académique' },
      description: { en: 'Peer review and publication standards.', fr: 'Évaluation par les pairs et normes de publication.' }
    },
    {
      icon: 'Scale',
      title: { en: 'Public Law', fr: 'Droit Public' },
      description: { en: 'Constitutional and administrative analysis.', fr: 'Analyse constitutionnelle et administrative.' }
    },
    {
      icon: 'Users',
      title: { en: 'Social Dynamics', fr: 'Dynamiques Sociales' },
      description: { en: 'Sociological trends in urban Africa.', fr: 'Tendances sociologiques en Afrique urbaine.' }
    }
  ],
  achievements: [
    { en: 'Editor of the Year 2023 (African Journals)', fr: 'Éditeur de l\'Année 2023 (Revues Africaines)' },
    { en: 'Chair of the Central African Research Council', fr: 'Présidente du Conseil de Recherche d\'Afrique Centrale' },
    { en: 'Published 50+ monthly editions', fr: 'A publié plus de 50 éditions mensuelles' }
  ]
};