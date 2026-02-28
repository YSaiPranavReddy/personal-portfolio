export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const heroData = {
  name: "Sai Pranav Reddy",
  role: "Full-Stack Developer, AIML Engineer",
  specialty: "Web & UI Engineering",
  passion: "building clean, human-centric digital products",
  taglinePill: "Where AI and modern web meet real-world impact.",
  location: "Hyderabad, IN",
  resume: "/Sai_Pranav_Resume.pdf",
  email: "saipranavreddyy09@gmail.com",
  linkedin:
    "https://www.linkedin.com/in/sai-pranav-reddy-yerrabandla-490301361/",
  github: "https://github.com/YSaiPranavReddy",
  leetcode: "https://leetcode.com/u/SaiPranavReddy_09/",
  photo: "/pic2.png",
};

export const aboutData = {
  bio: `I’m a Computer Science undergraduate at Neil Gogte Institute of Technology and currently an AI Research Intern at DrugParadigm, where I design and experiment with deep learning models for molecular and structure-aware data. My work focuses on building intelligent systems using Transformers, generative models, and advanced deep learning techniques to solve complex scientific problems.

Alongside AIML, I have strong experience in Full-Stack Development (MERN) and a solid foundation in data analysis, machine learning, and data science. I enjoy combining rigorous engineering practices with intelligent systems to build solutions that are both technically sound and practically impactful.`,
  image: "/me.jpeg",
};

export const education = [
  {
    degree: "Bachelor of Engineering in Computer Science and Engineering",
    institution: "Neil Gogte Institute of Technology",
    period: "2023 – Present",
    scoreLabel: "GPA",
    gpa: ": 9.04",
  },
  {
    degree: "Intermediate (XII)",
    institution: "Sri Chaitanya Junior College",
    period: "2021 – 2023",
    scoreLabel: "Percentage",
    gpa: ": 95.2%",
  },
  {
    degree: "SSC (X)",
    institution: "Sri Chaitanya School",
    period: "2021",
    scoreLabel: "GPA",
    gpa: ": 10.00",
  },
];

export const experiences = [
  {
    role: "DrugParadigm",
    company: "AI Research Intern",
    type: "Onsite",
    period: "April 2025 – Present",
    description:
      "Led the development of structure-aware generative and regression models for peptide and enzyme modalities using Graph Neural Networks and diffusion architectures. Designed and implemented complete training pipelines — from parsing PDB structures and engineering geometric features to integrating graph-based encoders with conditional transformers. Ran large-scale experiments, analyzed model behavior across structural metrics, and iteratively refined architectures to improve predictive accuracy and generative quality.",
    tech: [
      "Generative AI",
      "PyTorch",
      "Graph Neural Networks (GNNs)",
      "Diffusion Models",
      "Transformers",
      "Neural Networks",
      "Git",
      "Docker",
      "Linux",
    ],
    projects: [
      {
        name: "InversePep",
        description:
          "InversePep is a structure-conditioned peptide inverse folding and generation framework built using geometric deep learning and diffusion-based modeling.",
        github: "",
        demo: "",
        details: [
          "Architected a structure-conditioned peptide sequence generation framework integrating Geometric Vector Perceptron (GVP), Graph Convolutional Networks (GCNs), Transformers, and Diffusion models with 3D backbone-aware encoders.",
          "Designed and implemented end-to-end pipelines for Structural feature extraction, graph construction, and diffusion-based sequence modeling.",
          "Conducted systematic training, validation, and structural consistency evaluation using geometric alignment metrics (TM-SCORE) to assess generative robustness.",
          "Improved inverse folding benchmark performance by 7%+ over established baselines, optimized NVIDIA DGX training workflows to reduce training time, and co-authored a research paper submitted to Briefings in Bioinformatics.",
        ],
      },
      {
        name: "DeepEnzyme",
        description:
          "DeepEnzyme is a structure-aware regression framework for predicting enzyme kinetic parameters (KCAT) using geometric deep learning.",
        github: "",
        demo: "",
        details: [
          "Engineered a structure-aware regression architecture based on Squeeze-and-Excitation GVP-GNNs to model enzyme kinetics from combined sequence and 3D structural features.",
          "Built feature pipelines integrating residue-level embeddings with spatial geometric representations derived from PDB structures.",
          "Expanded and curated training datasets to improve coverage and reduce distribution bias across enzyme classes.",
          "Achieved 10%+ improvement in predictive accuracy through systematic feature engineering and architectural refinements.",
          "Containerized training and inference workflows using Docker, ensuring reproducible experimentation in Linux-based environments.",
        ],
      },
    ],
  },
];

export const skillGroups = [
  {
    title: "Full Stack Web Development",
    skills: [
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "GSAP",
      "REST APIs",
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind CSS",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    title: "AI / ML",
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Data Analysis",
      "Machine Learning",
      "Scikit-learn",
      "Natural Language Processing",
      "Deep Learning (ANNs, CNNs, RNNs)",
      "Transformers (BERT, LLMs)",
      "Graph Neural Networks (GNNs)",
      "Diffusion Models",
      "OpenCV",
      "HuggingFace",
      "Agents (LangChain, AutoGPT)",
    ],
  },
  {
    title: "Coursework & Tools",
    skills: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "System Design",
      "OOP",
      "Git",
      "GitHub",
      "Docker",
      "Linux",
      "VS Code",
      "Postman",
      "Jupyter",
      "Figma",
    ],
  },
];

export const projects = [
  // Research Papers
  // {
  //   title: "HOPING TO RELEASE SOON",
  //   description: "WILL UPDATE ONCE PUBLISHED",
  //   tags: ["WILL", "UPDATE", "ONCE", "PAPER", "IS", "OUT"], // keywords
  //   pdf: "/",
  //   github: "", // optional repo
  //   demo: "",
  //   image: "",
  //   featured: true,
  //   category: "research",
  // },
  {
    title: "Bloom - AI-Powered Plant Disease Detection",
    useCase:
      "Identifies crop diseases from leaf images and delivers real-time predictions to farmers.",
    description:
      "Bloom is an end-to-end plant disease detection system that is used to identify crop diseases from leaf images and deliver predictions",
    details: [
      "Built a CNN model with TensorFlow achieving ~95% classification accuracy across 38 plant disease classes.",
      "Integrated the model into a Node.js/Express REST API that accepts image uploads and returns predictions with confidence scores.",
      "Designed a responsive frontend (HTML/CSS/JS) with drag-and-drop image upload and animated result cards.",
      "Persisted prediction history per user session using MongoDB.",
      "Deployed the full application on Vercel with CI/CD pipelines for seamless updates.",
    ],
    tags: [
      "TensorFlow",
      "Convolutional Neural Networks",
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    github: "https://github.com/YSaiPranavReddy/plant-disease-detection-web",
    demo: "https://bloom--plant-disease-detector.vercel.app/",
    image: "/bloom.png",
    featured: false,
    category: ["aiml", "fullstack"],
  },
  {
    title: "NyayLens - Transformer-Based Legal QA System",
    useCase:
      "Summarizes and answers queries over legal documents using BERT and T5 transformers.",
    description:
      "NyayLens is a transformer-based legal document summarization and question-answering system that leverages BERT and T5 to extract information from legal documents.",
    details: [
      "Implemented a RAG pipeline combining BERT-based retrieval with T5-based generation for accurate legal Q&A.",
      "Fine-tuned T5 on a curated legal corpus for abstractive summarization of Indian legal documents.",
      "Built a React frontend with a rich-text editor for pasting documents and a chat-style Q&A interface.",
      "Wired the AI backend to a Node.js/Express API with MongoDB for document storage and mySQL for session management.",
      "Deployed on Vercel; the system handles multi-document queries with context-aware answers.",
    ],
    tags: [
      "PyTorch",
      "Transformers",
      "BERT",
      "T5",
      "RAG",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "mySQL",
    ],
    github: "https://github.com/YSaiPranavReddy/NyayLens",
    demo: "https://nyaylens.vercel.app/",
    image: "/nyaylens.png",
    featured: false,
    category: ["aiml", "fullstack"],
  },
  {
    title: "PranaSetu - Mental Health Risk Assessment System",
    useCase:
      "Multimodal AI system assessing mental health risk from text and image inputs.",
    description:
      "Full-stack AI-powered monitoring system integrating BERT-based text analysis and EfficientNet image modeling to perform multimodal mental health risk assessment.",
    details: [
      "Fused BERT (text stream) and EfficientNet (image stream) outputs via a late-fusion classifier for multimodal risk scoring.",
      "Integrated Gemini AI to generate empathetic, context-aware mental health recommendations alongside risk scores.",
      "Developed a FastAPI backend exposing inference endpoints consumed by a vanilla JS/HTML5 frontend.",
      "Stored anonymized user assessments and longitudinal tracking data in MongoDB.",
      "Designed with privacy-first principles — all data is processed server-side with no third-party analytics.",
    ],
    tags: [
      "PyTorch",
      "BERT",
      "EfficientNet",
      "FastAPI",
      "Gemini AI",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    github: "https://github.com/KasturiSnehaReddy/PranaSetu",
    demo: "",
    image: "/pranasetu.png",
    featured: false,
    category: "aiml",
  },
  {
    title: "IthiHasya - Responsive Frontend Website",
    useCase:
      "Visually rich, responsive website with custom cursors and GSAP-driven animations.",
    description:
      "IthiHasya is a responsive, and visually captivating frontend website built to deliver a smooth user experience. Custom cursors are implemented throughout the site to add a unique and aesthetic feel.",
    details: [
      "Built entirely with vanilla HTML, CSS, and JavaScript — no frontend framework, emphasising core web fundamentals.",
      "Implemented fully custom cursor animations with smooth lerp-based trailing effects using JavaScript.",
      "Used GSAP ScrollTrigger for scroll-linked entrance and parallax animations across all sections.",
      "Optimised for all screen sizes with fluid CSS Grid and Flexbox layouts.",
      "Hosted on GitHub Pages with a custom domain and achieved a Lighthouse performance score above 90.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "GSAP", "Custom Cursors"],
    github: "https://github.com/YSaiPranavReddy/Ithihasya",
    demo: "https://ysaipranavreddy.github.io/Ithihasya/",
    image: "/Ithihasya.png",
    featured: false,
    category: "fullstack",
  },
];

export const achievements = [
  {
    title: "3rd Place - Udbav Hackathon 2025",
    issuer: "KMEC",
    date: "December 2025",
    type: "hackathon",
    description:
      "Secured 3rd place in the Udbav Hackathon organized by KMEC, competing against teams from multiple institutions.",
    credential: "",
  },
  {
    title: "Top 5% - Amazon ML Challenge 2025",
    issuer: "Amazon",
    date: "December 2025",
    type: "hackathon",
    description:
      "Secured top 5% ( 332 out of 8000 teams ) in the Amazon Machine Learning Challenge 2025, demonstrating strong proficiency in machine learning and data science.",
    credential: "",
  },
  {
    title: "OCI 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "2025",
    type: "certification",
    description:
      "Earned the OCI Certified AI Foundations Associate credential by demonstrating proficiency in AI concepts, OCI AI services, and practical application of AI solutions on Oracle Cloud.",
    credential: "/Oracle.png",
  },
  {
    title: "Data Analysis Using Python",
    issuer: "IBM",
    date: "2025",
    type: "certification",
    description:
      "Completed the 'Data Analysis Using Python' course by IBM, covering data manipulation, analysis, and visualization techniques.",
    credential: "/ibm.pdf",
  },
];

export const contact = {
  email: "saipranavreddyy09@gmail.com",
  github: "https://github.com/YSaiPranavReddy",
  linkedin:
    "https://www.linkedin.com/in/sai-pranav-reddy-yerrabandla-490301361/",
  whatsapp: "919573674203",
};
