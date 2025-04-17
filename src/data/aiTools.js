const aiTools = [
  {
    category: "Văn bản",
    description: "Các công cụ AI hỗ trợ tạo, chỉnh sửa và phân tích văn bản",
    tools: [
      {
        id: 1,
        name: "ChatGPT",
        description: "Chatbot AI có khả năng tạo văn bản, trả lời câu hỏi và hỗ trợ nhiều tác vụ",
        link: "https://chat.openai.com",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png"
      },
      {
        id: 2,
        name: "Gemini",
        description: "Công cụ kiểm tra ngữ pháp và cải thiện văn bản sử dụng AI",
        link: "https://gemini.google.com/app?hl=vi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/1920px-Google_Gemini_logo.svg.png"
      },
      {
        id: 3,
        name: "NotebookLM",
        description: "Trợ lý viết lách thông minh tích hợp trong Notion",
        link: "https://notebooklm.google/",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/NotebookLM_logo.svg/1920px-NotebookLM_logo.svg.png"
      }
    ]
  },
  {
    category: "Giọng nói",
    description: "Các công cụ xử lý và tạo giọng nói bằng AI",
    tools: [
      {
        id: 4,
        name: "KLTTSAI",
        description: "Nền tảng tạo giọng nói AI chất lượng cao và tự nhiên",
        link: "https://ttshub.com/",
        image: "https://images.imyfone.com/filme/assets/article/TTS.jpeg"
      },
    ]
  },
  {
    category: "Slide",
    description: "Công cụ AI giúp tạo và thiết kế trình chiếu",
    tools: [
      {
        id: 8,
        name: "Beautiful.ai",
        description: "Phần mềm tạo slide thông minh với thiết kế tự động",
        link: "https://www.beautiful.ai",
        image: "https://assets.stickpng.com/images/62dd3a5ee4ec7516a5ab67fc.png"
      },
      {
        id: 9,
        name: "Tome",
        description: "Công cụ tạo trình chiếu bằng AI",
        link: "https://tome.app",
        image: "https://framerusercontent.com/images/j4h9zV9RXGRk6VIp88rnBDVlbMY.png"
      },
      {
        id: 10,
        name: "SlidesAI",
        description: "Tạo slide từ văn bản với AI",
        link: "https://www.slidesai.io",
        image: "https://www.slidesai.io/assets/icons/logo.svg"
      }
    ]
  },
  {
    category: "Hình ảnh",
    description: "Công cụ AI tạo và chỉnh sửa hình ảnh",
    tools: [
      {
        id: 12,
        name: "Midjourney",
        description: "Công cụ tạo hình ảnh AI dựa trên lời nhắc văn bản",
        link: "https://www.midjourney.com",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png"
      },
      {
        id: 13,
        name: "Stable Diffusion",
        description: "Mô hình AI mã nguồn mở tạo hình ảnh từ mô tả văn bản",
        link: "https://stability.ai/stable-diffusion",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Stable_Diffusion_wordmark_logo.svg"
      },
      {
        id: 14,
        name: "Adobe Firefly",
        description: "Bộ công cụ AI sáng tạo từ Adobe",
        link: "https://www.adobe.com/products/firefly.html",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Firefly_logo.svg/640px-Adobe_Firefly_logo.svg.png"
      }
    ]
  },
  {
    category: "Video",
    description: "Công cụ AI để tạo và chỉnh sửa video",
    tools: [
      {
        id: 15,
        name: "Runway",
        description: "Phần mềm chỉnh sửa video AI với nhiều tính năng sáng tạo",
        link: "https://runwayml.com",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Runway_company_logo.png"
      },
      {
        id: 16,
        name: "Synthesia",
        description: "Tạo video với người dẫn AI từ văn bản",
        link: "https://www.synthesia.io",
        image: "https://framerusercontent.com/images/n5V7nwzBrdvS8PJXGUQXUzlkA.png"
      },
      {
        id: 17,
        name: "HeyGen",
        description: "Nền tảng tạo video AI với avatar kỹ thuật số",
        link: "https://www.heygen.com",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Heygen_Logo_%282023%29.svg"
      }
    ]
  },
  {
    category: "Mã nguồn",
    description: "Công cụ AI hỗ trợ lập trình và phát triển phần mềm",
    tools: [
      {
        id: 18,
        name: "GitHub Copilot",
        description: "Trợ lý lập trình AI được phát triển bởi GitHub và OpenAI",
        link: "https://github.com/features/copilot",
        image: "https://github.gallerycdn.vsassets.io/extensions/github/copilot/1.143.0/1700657300003/Microsoft.VisualStudio.Services.Icons.Default"
      },
      {
        id: 19,
        name: "Replit",
        description: "Nền tảng phát triển với tích hợp AI",
        link: "https://replit.com",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Repl.it_logo.svg/1200px-Repl.it_logo.svg.png"
      },
      {
        id: 20,
        name: "Tabnine",
        description: "Trợ lý lập trình với tự động hoàn thành mã thông minh",
        link: "https://www.tabnine.com",
        image: "https://assets-global.website-files.com/627a1e4396f688512c67a0f7/627a2bc8cfce51b5bfb4e7f8_tabnine-logo.png"
      }
    ]
  }
];

export default aiTools; 