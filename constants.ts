import { Article, LawyerProfile, Translation } from './types';

export const TRANSLATIONS: Translation = {
  navHome: { en: 'Home', fr: 'Accueil' },
  navArticles: { en: 'Legal Library', fr: 'Bibliothèque Juridique' },
  navProfile: { en: 'The Lawyer', fr: 'L\'Avocate' },
  navSubmit: { en: 'Submit Article', fr: 'Soumettre un Article' },
  navAdmin: { en: 'Admin Portal', fr: 'Portail Admin' },
  navContact: { en: 'Contact Us', fr: 'Contactez-nous' },
  heroTitle: { en: 'Excellence in Cameroonian Law', fr: 'L\'Excellence en Droit Camerounais' },
  heroSubtitle: { en: 'Your trusted partner for business law, litigation, and corporate affairs in Central Africa.', fr: 'Votre partenaire de confiance pour le droit des affaires, le contentieux et les affaires corporatives en Afrique Centrale.' },
  heroCta: { en: 'Browse Library', fr: 'Parcourir la Bibliothèque' },
  latestArticles: { en: 'Latest Legal Insights', fr: 'Dernières Actualités Juridiques' },
  viewAll: { en: 'View All Documents', fr: 'Voir Tous les Documents' },
  aboutFirm: { en: 'Strategic Counsel in Douala & Yaoundé', fr: 'Conseil Stratégique à Douala & Yaoundé' },
  aboutFirmText: { 
    en: 'Based in the economic heart of Cameroon, we specialize in navigating complex legal frameworks. From corporate formation in Akwa to land disputes in the West, we provide authority and clarity.',
    fr: 'Basés au cœur économique du Cameroun, nous sommes spécialisés dans la navigation des cadres juridiques complexes. De la constitution de sociétés à Akwa aux litiges fonciers à l\'Ouest, nous apportons autorité et clarté.'
  },
  contactTitle: { en: 'Contact Offices', fr: 'Contacter les Bureaux' },
  adminDashboard: { en: 'Maître\'s Dashboard', fr: 'Tableau de Bord' },
  generateIdea: { en: 'AI Topic Assistant', fr: 'Assistant Sujet IA' },
  submitHeroTitle: { en: 'Submit Legal Document', fr: 'Soumettre un Document Juridique' },
  submitHeroSubtitle: { en: 'Send your articles or case files directly to our review team.', fr: 'Envoyez vos articles ou dossiers directement à notre équipe de révision.' },
  submitName: { en: 'Author / Full Name', fr: 'Auteur / Nom Complet' },
  submitContact: { en: 'Phone / Email', fr: 'Téléphone / Email' },
  submitTopic: { en: 'Article Title', fr: 'Titre de l\'Article' },
  submitFile: { en: 'Upload PDF Document', fr: 'Télécharger Document PDF' },
  submitBtn: { en: 'Send to Office', fr: 'Envoyer au Bureau' },
  submitNote: { en: 'Note: Clicking send will open your email client addressed to keblehonour@gmail.com. Please attach your PDF file manually.', fr: 'Note : Cliquer sur envoyer ouvrira votre messagerie adressée à keblehonour@gmail.com. Veuillez joindre votre fichier PDF manuellement.' },
  articleCtaTitle: { en: 'Share Your Expertise', fr: 'Partagez Votre Expertise' },
  articleCtaBtn: { en: 'Upload Now', fr: 'Télécharger Maintenant' },
  downloadBtn: { en: 'Download PDF', fr: 'Télécharger PDF' },
  // Admin Table
  adminTableTitle: { en: 'Document Title', fr: 'Titre du Document' },
  adminTableCategory: { en: 'Category', fr: 'Catégorie' },
  adminTableDate: { en: 'Date Published', fr: 'Date de Publication' },
  adminTableActions: { en: 'Actions', fr: 'Actions' },
  adminDelete: { en: 'Delete', fr: 'Supprimer' },
  adminEmpty: { en: 'No documents found.', fr: 'Aucun document trouvé.' }
};

// A small valid PDF base64 string for demonstration purposes
export const SAMPLE_PDF = "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmogCjw8CiAgL1R5cGUgL1BhZ2VzCiAgL01lZGlhQm94IFsgMCAwIDIwMCAyMDAgXQogIC9Db3VudCAxCiAgL0tpZHMgWyAzIDAgUiBdCj4+CmVuZG9iagoKMyAwIG9iago8PAogIC9UeXBlIC9QYWdlCiAgL1BhcmVudCAyIDAgUHIKICAvUmVzb3VyY2VzIDw8CiAgICAvRm9udCA8PAogICAgICAvRjEgNCAwIFIKICAgID4+CiAgPj4KICAvQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCgo0IDAgb2JqCjw8CiAgL1R5cGUgL0ZvbnQKICAvU3VidHlwZSAvVHlwZTEKICAvQmFzZUZvbnQgL1RpbWVzLVJvbWFuCj4+CmVuZG9iagoKNSAwIG9iago8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDE1NyAwMDAwMCBuIAowMDAwMDAwMjU1IDAwMDAwIG4gCjAwMDAwMDAzNDQgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDQ5CiUlRU9GCg==";

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: { en: 'The New Finance Law 2024: Impact on SMEs', fr: 'La Nouvelle Loi de Finances 2024 : Impact sur les PME' },
    excerpt: { en: 'An analysis of tax reforms affecting businesses in Douala and Yaoundé.', fr: 'Une analyse des réformes fiscales affectant les entreprises à Douala et Yaoundé.' },
    category: 'Fiscal Law',
    date: 'Jan 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    readTime: '6 min',
    pdfUrl: SAMPLE_PDF
  },
  {
    id: '2',
    title: { en: 'Land Tenure in Cameroon: Getting a Title', fr: 'Régime Foncier au Cameroun : Obtenir un Titre' },
    excerpt: { en: 'Navigating the procedure for obtaining a Land Title (Titre Foncier) securely.', fr: 'Naviguer dans la procédure d\'obtention d\'un Titre Foncier en toute sécurité.' },
    category: 'Land Law',
    date: 'Dec 10, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1449824913929-4bba42a305f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    readTime: '12 min',
    pdfUrl: SAMPLE_PDF
  },
  {
    id: '3',
    title: { en: 'Commercial Recovery Procedures', fr: 'Procédures de Recouvrement Commercial' },
    excerpt: { en: 'Effective strategies for debt recovery under current regulations.', fr: 'Stratégies efficaces pour le recouvrement de créances selon la réglementation actuelle.' },
    category: 'Corporate',
    date: 'Nov 22, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    readTime: '8 min',
    pdfUrl: SAMPLE_PDF
  },
  {
    id: '4',
    title: { en: 'Mining Code & Local Investment', fr: 'Code Minier et Investissement Local' },
    excerpt: { en: 'Understanding the legal framework for mining operations in the East Region.', fr: 'Comprendre le cadre juridique des opérations minières dans la région de l\'Est.' },
    category: 'Mining Law',
    date: 'Oct 05, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1518550687729-0162a84433f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    readTime: '15 min',
    pdfUrl: SAMPLE_PDF
  },
];

export const LAWYER_PROFILE: LawyerProfile = {
  name: 'Maître Eleanor Sterling',
  title: { en: 'Advocate | Cameroon Bar Association', fr: 'Avocate | Barreau du Cameroun' },
  yearsExperience: 18,
  bio: {
    en: 'Maître Eleanor Sterling is a leading figure in Cameroonian business law. Member of the Cameroon Bar Association since 2006, she specializes in business regulations, maritime law in the Gulf of Guinea, and complex land disputes. She advises multinational corporations settling in the CEMAC zone.',
    fr: 'Maître Eleanor Sterling est une figure de proue du droit des affaires camerounais. Membre du Barreau du Cameroun depuis 2006, elle se spécialise dans la réglementation des affaires, le droit maritime dans le golfe de Guinée et les litiges fonciers complexes. Elle conseille les multinationales s\'installant dans la zone CEMAC.'
  },
  specialties: [
    {
      icon: 'Scale',
      title: { en: 'Corporate Law', fr: 'Droit des Affaires' },
      description: { en: 'Company formation and restructuring.', fr: 'Création et restructuration d\'entreprises.' }
    },
    {
      icon: 'Shield',
      title: { en: 'Land & Property', fr: 'Droit Foncier' },
      description: { en: 'Securing land titles and leaseholds.', fr: 'Sécurisation des titres fonciers et baux.' }
    },
    {
      icon: 'BookOpen',
      title: { en: 'Maritime & Transport', fr: 'Maritime & Transport' },
      description: { en: 'Port of Douala logistics litigation.', fr: 'Contentieux logistique au Port de Douala.' }
    }
  ],
  achievements: [
    { en: 'Member of Cameroon Bar Association (No. 237/89)', fr: 'Membre du Barreau du Cameroun (N° 237/89)' },
    { en: 'Advisor to the Ministry of Justice', fr: 'Conseillère au Ministère de la Justice' },
    { en: 'Certified Arbitrator', fr: 'Arbitre Certifié' }
  ]
};
