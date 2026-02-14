import Image from "next/image";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

interface TechItem {
  name: string;
  icon: string;
}

interface TechCategory {
  title: string;
  color: string;
  items: TechItem[];
}

const STACK: TechCategory[] = [
  {
    title: "GenAI · LLMs · RAG · Agents",
    color: "text-cyan-400",
    items: [
      { name: "OpenAI / GPT", icon: "01_GenAI_LLMs_RAG_Agents/LLMs/gpt.png" },
      { name: "Claude", icon: "01_GenAI_LLMs_RAG_Agents/LLMs/anthropic.svg" },
      { name: "LLaMA", icon: "01_GenAI_LLMs_RAG_Agents/LLMs/llama.png" },
      { name: "Mistral", icon: "01_GenAI_LLMs_RAG_Agents/LLMs/mistral.png" },
      { name: "Falcon", icon: "01_GenAI_LLMs_RAG_Agents/LLMs/falcon.png" },
      { name: "HuggingFace", icon: "01_GenAI_LLMs_RAG_Agents/Embeddings/huggingface.png" },
      { name: "LangGraph", icon: "01_GenAI_LLMs_RAG_Agents/RAG_frameworks/langgraph.png" },
      { name: "Qdrant", icon: "01_GenAI_LLMs_RAG_Agents/Vector_DBs/qdrant.png" },
      { name: "ChromaDB", icon: "01_GenAI_LLMs_RAG_Agents/Vector_DBs/chromadb.png" },
      { name: "FAISS", icon: "01_GenAI_LLMs_RAG_Agents/Retrieval_Vector_Search/faiss.png" },
      { name: "Pinecone", icon: "01_GenAI_LLMs_RAG_Agents/Retrieval_Vector_Search/pinecone.png" },
    ],
  },
  {
    title: "Fine-tuning · Optimization",
    color: "text-purple-400",
    items: [
      { name: "PEFT", icon: "01_GenAI_LLMs_RAG_Agents/Fine_tuning/peft.svg" },
      { name: "LoRA / QLoRA", icon: "01_GenAI_LLMs_RAG_Agents/Fine_tuning/lora.svg" },
      { name: "Transformers", icon: "02_AI_Modeling_ML/NLP_Transformers/transformers.png" },
    ],
  },
  {
    title: "AI Modeling · ML · Deep Learning",
    color: "text-violet-400",
    items: [
      { name: "PyTorch", icon: "02_AI_Modeling_ML/Deep_Learning/pytorch.png" },
      { name: "JAX", icon: "02_AI_Modeling_ML/Deep_Learning/jax.png" },
      { name: "Scikit-learn", icon: "02_AI_Modeling_ML/Classical_ML/scikitlearn.png" },
      { name: "OpenCV", icon: "02_AI_Modeling_ML/Vision_Multimodal/opencv.png" },
      { name: "YOLOv8", icon: "02_AI_Modeling_ML/Vision_Multimodal/yolov8.png" },
    ],
  },
  {
    title: "Backend · APIs · Architecture",
    color: "text-emerald-400",
    items: [
      { name: "Python", icon: "03_Backend_APIs_Architecture/Lenguajes/python.png" },
      { name: "TypeScript", icon: "03_Backend_APIs_Architecture/Lenguajes/typescript.png" },
      { name: "Go", icon: "03_Backend_APIs_Architecture/Lenguajes/go.png" },
      { name: "Rust", icon: "03_Backend_APIs_Architecture/Lenguajes/rust.png" },
      { name: "FastAPI", icon: "03_Backend_APIs_Architecture/Frameworks/fastapi.png" },
      { name: "Flask", icon: "03_Backend_APIs_Architecture/Frameworks/flask.png" },
      { name: "Express", icon: "03_Backend_APIs_Architecture/Frameworks/express.png" },
      { name: "GraphQL", icon: "03_Backend_APIs_Architecture/Frameworks/graphql.png" },
      { name: "Node.js", icon: "03_Backend_APIs_Architecture/Realtime_Streaming/nodejs.png" },
    ],
  },
  {
    title: "Databases · Storage · Caching",
    color: "text-amber-400",
    items: [
      { name: "PostgreSQL", icon: "05_Datos_Bases_de_Datos_Storage/Relacionales/postgresql.png" },
      { name: "MySQL", icon: "05_Datos_Bases_de_Datos_Storage/Relacionales/mysql.png" },
      { name: "SQLite", icon: "05_Datos_Bases_de_Datos_Storage/Relacionales/sqlite.png" },
      { name: "MongoDB", icon: "05_Datos_Bases_de_Datos_Storage/NoSQL/mongodb.png" },
      { name: "Redis", icon: "05_Datos_Bases_de_Datos_Storage/Caching_rate_limit/redis.png" },
      { name: "Elasticsearch", icon: "05_Datos_Bases_de_Datos_Storage/NoSQL/elasticsearch.png" },
    ],
  },
  {
    title: "MLOps · Deploy · Infra",
    color: "text-rose-400",
    items: [
      { name: "Docker", icon: "06_MLOps_Deploy_Infra/Containerization/docker.png" },
      { name: "Kubernetes", icon: "06_MLOps_Deploy_Infra/Orchestration/kubernetes.png" },
      { name: "AWS", icon: "06_MLOps_Deploy_Infra/Cloud/aws.png" },
      { name: "GitLab CI", icon: "06_MLOps_Deploy_Infra/CI_CD/gitlab.png" },
      { name: "Nginx", icon: "06_MLOps_Deploy_Infra/Reverse_proxy_web/nginx.png" },
      { name: "Cloudflare", icon: "06_MLOps_Deploy_Infra/Cloud/cloudflare.png" },
      { name: "Ollama", icon: "06_MLOps_Deploy_Infra/Model_serving/ollama.png" },
    ],
  },
  {
    title: "Observability · Monitoring",
    color: "text-orange-400",
    items: [
      { name: "Grafana", icon: "07_Observability_Monitoring/Metrics/grafana.png" },
      { name: "Prometheus", icon: "07_Observability_Monitoring/Metrics/prometheus.png" },
      { name: "Sentry", icon: "07_Observability_Monitoring/Logging/sentry.png" },
    ],
  },
  {
    title: "Frontend · UI",
    color: "text-sky-400",
    items: [
      { name: "React", icon: "08_Frontend_UI/React_ecosystem/react.png" },
      { name: "Next.js", icon: "08_Frontend_UI/React_ecosystem/react.png" },
      { name: "Tailwind CSS", icon: "08_Frontend_UI/CSS_Styling/tailwindcss.png" },
      { name: "Gradio", icon: "08_Frontend_UI/Low_code_UI/gradio.png" },
      { name: "Streamlit", icon: "08_Frontend_UI/Low_code_UI/streamlit.png" },
    ],
  },
  {
    title: "Data Science · Analytics",
    color: "text-teal-400",
    items: [
      { name: "Pandas", icon: "09_Data_Science_Analytics/Data_Processing/pandas.png" },
      { name: "NumPy", icon: "09_Data_Science_Analytics/Data_Processing/numpy.png" },
      { name: "Jupyter", icon: "09_Data_Science_Analytics/Notebooks/jupyter.png" },
      { name: "Matplotlib", icon: "09_Data_Science_Analytics/Visualization/matplotlib.png" },
      { name: "Seaborn", icon: "09_Data_Science_Analytics/Visualization/seaborn.png" },
    ],
  },
];

export function StackSection() {
  return (
    <section id="stack" className="relative py-28 px-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <AnimateOnScroll className="mb-16 text-center">
          <p className="mb-2 font-mono text-sm text-primary tracking-wide uppercase">
            Technologies
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Technical <span className="gradient-text">Stack</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Tools and frameworks I work with across the full AI/ML lifecycle —
            from research to production.
          </p>
        </AnimateOnScroll>

        <div className="space-y-10">
          {STACK.map((category, ci) => (
            <AnimateOnScroll key={category.title} delay={ci * 60}>
              <div className="rounded-xl bg-card/50 border border-border/50 p-6">
                <h3
                  className={`mb-5 font-mono text-xs font-semibold uppercase tracking-widest ${category.color}`}
                >
                  {category.title}
                </h3>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="group flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-secondary/50"
                    >
                      <div className="relative h-9 w-9 flex-shrink-0">
                        <Image
                          src={`/icons/${item.icon}`}
                          alt={item.name}
                          fill
                          className="object-contain transition-transform group-hover:scale-110"
                          sizes="36px"
                          unoptimized={item.icon.endsWith(".svg")}
                        />
                      </div>
                      <span className="text-center text-[10px] leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
