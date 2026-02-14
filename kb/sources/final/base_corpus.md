---
corpus_name: "deeprat-professional-corpus"
owner: "Gonzalo Romero (DeepRatAI)"
last_updated: "2026-02-13"
languages: ["en", "es"]
purpose: "Primary knowledge base for Deeprat.tech personal assistant (RAG)."
notes:
  - "This corpus is a consolidated, de-duplicated merge of: GitHub Profile README + Website copy + CV."
  - "Prefer answering in the user’s language (EN/ES). If unclear, default to English."
  - "Always include relevant links when asked (projects, contact, profiles)."
---

# 0) Identity (EN/ES)

## EN — Short identity
I’m Gonzalo Romero, an AI Engineer focused on building **production-grade AI systems** (not demos). My core work sits at the intersection of **GenAI (RAG + agents)** and **backend/platform engineering**, emphasizing **security, observability, reliability, and real operational constraints**—especially in sensitive domains (corporate / clinical).

## ES — Identidad breve
Soy Gonzalo Romero, AI Engineer enfocado en construir **sistemas de IA orientados a producción** (no demos). Mi perfil está en la intersección entre **GenAI (RAG + agentes)** y **backend/plataforma**, con foco fuerte en **seguridad, observabilidad, confiabilidad y operación real**, especialmente en dominios sensibles (corporativo / clínico).

---

# 1) Primary Links (canonical)

- Website: https://www.deeprat.tech
- GitHub org/profile: https://github.com/DeepRatAI
- LinkedIn: https://www.linkedin.com/in/gonzalo-romero-b9b5b4355/
- Email: deeprat.tec@gmail.com

## Flagship repositories
- Cortex (Corporate Knowledge Assistant): https://github.com/DeepRatAI/cortex-knowledge-assistant
- MedX (Medical RAG assistant prototype): https://github.com/DeepRatAI/Med-X-KimiK2-RAG

## Certificates / learning (Coursera references)
(Use only if asked for credentials or proof of coursework)
- https://www.coursera.org/account/accomplishments/certificate/DC3R530QSFEX
- https://www.coursera.org/account/accomplishments/certificate/NYRAY3CWX5OM
- https://www.coursera.org/account/accomplishments/certificate/RWJ6S047T5AK
- https://www.coursera.org/account/accomplishments/certificate/Y4YMMARVQVI1
- https://www.coursera.org/account/accomplishments/specialization/certificate/KGPJ34OTAQXR
- https://www.coursera.org/account/accomplishments/specialization/certificate/RSIQ88E92KMH
- https://www.coursera.org/account/accomplishments/verify/0H61CITWOIZO
- https://www.coursera.org/account/accomplishments/verify/5CY9OXPL6I7U
- https://www.coursera.org/account/accomplishments/verify/ASHKW06G2OYZ
- https://www.coursera.org/account/accomplishments/verify/CXEO3X2KPEJL
- https://www.coursera.org/account/accomplishments/verify/DSYIPSU2SUOC
- https://www.coursera.org/account/accomplishments/verify/P93YN7IBD6SC
- https://www.coursera.org/account/accomplishments/verify/SQZGS7JIGS1L
- https://www.coursera.org/account/accomplishments/verify/SW7LSLODUZUT
- https://www.coursera.org/account/accomplishments/verify/XWHCZJ2X7KBY

---

# 2) Target Roles (positioning)

## EN
1) **Senior AI / ML Engineer (GenAI: RAG, Agents, Applied LLM systems)**  
2) **Senior Backend Engineer for AI-native services (Python-first, production systems)**  
3) **MLOps / AI Platform Engineer (deployment, serving, observability, cost control)**  

Typical problems I solve:
- Building secure RAG systems for internal knowledge (multi-tenant, RBAC, auditability)
- Designing agentic backends with tool-use, memory, evaluation harnesses
- Productionizing AI services with deployment pipelines, monitoring, and cost governance

## ES
1) **Senior AI / ML Engineer (GenAI: RAG, agentes, sistemas LLM aplicados)**  
2) **Senior Backend Engineer para servicios AI-native (Python-first, producción)**  
3) **MLOps / AI Platform Engineer (deploy, serving, observabilidad, control de costos)**  

Problemas típicos:
- RAG seguro para conocimiento interno (multi-tenant, RBAC, auditoría)
- Backends agentic con tool-use, memoria, evaluación
- Productivizar servicios AI con pipelines, monitoreo y control de costos

---

# 3) Flagship Projects

## 3.1 Cortex — Corporate Knowledge Assistant (EN)

**What it is:** An enterprise-grade RAG knowledge assistant to turn internal documentation into a secure, scalable conversational interface.  
**Design goal:** Operate in sensitive / regulated contexts with strict data isolation and zero-tolerance leakage expectations.

**Core characteristics (high-level):**
- RAG platform with a production mindset (security + observability are first-class)
- Multi-tenant thinking (tenant isolation, access control)
- PII-aware processing (classification + masking workflows)
- Auditability and operational control (logging, metrics, traces, cost awareness)

**Stack highlights (representative):**
- Backend: Python (FastAPI), auth patterns (JWT/RBAC), structured logging
- Retrieval: embeddings + vector search (Qdrant and/or compatible vector stores)
- Infra: containerization, CI/CD automation, monitoring components
- UI: web interface patterns (React-based frontend in the ecosystem)

**When to reference:** If asked “tell me about a complex system you built” or “how do you build RAG for production”.

## 3.1 Cortex — Asistente corporativo de conocimiento (ES)

**Qué es:** Plataforma RAG para convertir documentación interna en un asistente conversacional seguro y escalable.  
**Objetivo:** Operar en entornos sensibles/regulados con aislamiento fuerte y tolerancia cero a fugas de datos.

**Características clave:**
- Enfoque de producción (seguridad + observabilidad desde el inicio)
- Multi-tenant real (aislamiento por tenant, control de acceso)
- Procesamiento consciente de PII (clasificación + masking)
- Auditoría y control operativo (logging, métricas, trazas, control de costos)

---

## 3.2 MedX — Medical RAG Assistant (EN)

**What it is:** A RAG-powered medical assistant prototype for clinical document Q&A and source-grounded responses.  
**Status:** Under renovation (prototype / educational focus).  
**Stack themes:** LangChain-based orchestration, clinical-domain retrieval, careful prompting and source citation.

Repo: https://github.com/DeepRatAI/Med-X-KimiK2-RAG

## 3.2 MedX — Asistente médico RAG (ES)

**Qué es:** Prototipo de asistente médico con RAG para consultas sobre documentos clínicos y respuestas con fuentes.  
**Estado:** En renovación (prototipo / educativo).  
**Temas:** orquestación con LangChain, retrieval clínico, prompting cuidadoso y citación de fuentes.

---

# 4) Technical Stack (complete consolidated list)

> Note: This list is intentionally broad. For “public-facing” pages, curate to the most relevant subset.

## GenAI & Applied AI Systems
- LLMs: GPT, Mistral, LLaMA, Falcon, Kimi, Qwen-VL
- RAG & orchestration: LangChain, LangGraph
- Retrieval / vector search: FAISS, Chroma, Weaviate, Pinecone
- Vector databases: Qdrant, Milvus, ChromaDB
- Agents & tool-use: ReAct, OpenAgents, AutoGPTQ
- Fine-tuning: LoRA, QLoRA, PEFT, bitsandbytes
- Runtime & formats: GGUF, llama.cpp

## AI Modeling & Training
- Frameworks: PyTorch, Hugging Face Transformers, scikit-learn, XGBoost
- Workflows: training pipelines, quantization, distillation, evaluation metrics
- Vision / multimodal: OpenCV, YOLOv8, CLIP, BLIP, Vision Transformer (ViT), Stable Diffusion, SDXL

## NLP & Data Intelligence
- Embeddings: SentenceTransformers, Cohere, OpenAI, Hugging Face models
- Processing: spaCy, NLTK, Regex, custom pipelines
- Graph reasoning / memory: GraphRAG, LangGraph memory patterns

## Backend Engineering
- Language: Python (advanced)
- APIs: FastAPI, Flask, WebSocket
- Auth & security patterns: JWT, OAuth2, RBAC, multi-tenant architectures
- Databases: PostgreSQL, MySQL, SQLite, MongoDB
- Observability: structured logging, Prometheus, Grafana

## MLOps & Deployment
- Hosting / serving: Hugging Face (Spaces), Ollama, Replicate, Triton, ggml
- CI/CD & automation: GitHub Actions, Docker, Docker Compose, Make
- Cloud: AWS, GCP, Cloudflare
- LLM monitoring / tracing: LangSmith, inference logs, custom metrics APIs
- Scripting / ops: bash scripting, SSH

## Full-Stack & UI
- Frontend / app UI: Gradio, Streamlit, HTML5, CSS3, JavaScript, TailwindCSS
- UX patterns: prompt UIs, streaming interfaces, agents-as-apps
- Templating / rendering: Jinja2, Markdown rendering

## Data & Analytics
- Tools: NumPy, Pandas, Matplotlib, Seaborn, UMAP
- Visualization: embedding plots, attention maps, token analysis
- Workspaces: Jupyter, Google Colab

## Development Workflow (kept minimal for corpus completeness)
- Versioning: Git, GitHub
- Tooling: VS Code, Notion, Make, SSH
- Documentation: Markdown, README-driven development

---

# 5) How I Work (method summary)

## EN
- **Docs-first & decision records:** I use clear documentation and decision notes (ADRs/RFC-style) to justify trade-offs and keep systems maintainable.
- **Security from day one:** threat awareness, access control, least privilege, tenant isolation, audit logs.
- **Evaluation-first for GenAI:** I define quality metrics early and iterate with evaluation harnesses rather than relying on vibes.
- **Observability & cost awareness:** structured logs, tracing, metrics, and cost/token tracking where applicable.
- **Production bias:** CI/CD, containerized deployments, reproducibility, and operational readiness.

## ES
- **Docs-first y registros de decisión:** documentación clara + ADR/RFC para justificar trade-offs y mantener mantenibilidad.
- **Seguridad desde el inicio:** control de acceso, mínimo privilegio, aislamiento por tenant, auditoría.
- **Evaluation-first en GenAI:** métricas y evaluación desde el inicio para iterar con rigor.
- **Observabilidad y costos:** logs estructurados, trazas, métricas, tracking de costo/tokens.
- **Sesgo a producción:** CI/CD, contenedores, reproducibilidad y operación real.

---

# 6) Professional Experience (high-level)

## EN
- A customized deployment of a **Cortex** knowledge assistant for a legal environment (document-heavy workflows, access control sensitivity).

## ES
- Implementación personalizada de **Cortex** para un entorno legal (documentación interna, sensibilidad de acceso).

---

# 7) Education

## EN
- Universidad Tecnológica Nacional (UTN) — Systems Engineering (currently 4th year; studies paused temporarily to focus on applied AI).
- Continuous technical learning: extensive coursework and self-directed study focused on ML, GenAI, MLOps, and backend systems.

## ES
- Universidad Tecnológica Nacional (UTN) — Ingeniería en Sistemas (4to año; pausa temporal para enfocarme en IA aplicada).
- Formación continua: cursos y autoaprendizaje enfocado en ML, GenAI, MLOps y backend.

---

# 8) Contact routing (EN/ES)

## EN
Primary channels: LinkedIn and Email.  
Email subject routing recommendation (prefix-based):
Use one of these prefixes at the beginning of the subject line: **[JOB] [CONSULT] [COLLAB] [CORTEX] [MEDEX] [OTHER]**.

## ES
Canales principales: LinkedIn y Email.  
Recomendación para filtrar emails por asunto:
Usar prefijos al inicio: **[JOB] [CONSULT] [COLLAB] [CORTEX] [MEDEX] [OTHER]**.

---

# 9) Assistant behavior rules (for the chatbot)

1) Always answer in the user’s language (EN/ES). If unclear, default to English and offer Spanish.
2) Prefer concise, production-oriented answers (engineering tone).
3) When asked “where can I see that?”, provide:
   - GitHub profile: https://github.com/DeepRatAI
   - Cortex repo: https://github.com/DeepRatAI/cortex-knowledge-assistant
   - Website: https://www.deeprat.tech
   - LinkedIn: https://www.linkedin.com/in/gonzalo-romero-b9b5b4355/
4) When asked “contact?”, provide email and LinkedIn and the subject-prefix convention.
5) When asked about roles: emphasize GenAI systems + backend/platform + production/security/observability focus.

---
END OF CORPUS
