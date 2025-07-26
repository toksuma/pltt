import { 
  Handshake, 
  Users, 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Target,
  Globe,
  MessageCircle,
  Phone,
  Mail,
  Clock
} from "lucide-react";

const partnershipTypes = [
  {
    id: 1,
    icon: Users,
    title: "Đối tác phân phối",
    subtitle: "Trở thành đại lý phân phối dịch vụ Landing Page",
    description: "Bạn có hệ thống khách hàng và muốn mở rộng danh mục dịch vụ? Hãy trở thành đối tác phân phối của chúng tôi.",
    benefits: [
      "Hoa hồng cạnh tranh 15-30%",
      "Hỗ trợ marketing materials",
      "Training chuyên nghiệp",
      "Support 24/7"
    ],
    gradient: "from-primary-500 to-primary-600",
    bgGradient: "from-primary-50 to-primary-100"
  },
  {
    id: 2,
    icon: Zap,
    title: "Đối tác kỹ thuật",
    subtitle: "Hợp tác phát triển công nghệ và giải pháp",
    description: "Có kinh nghiệm về web development? Hãy cùng chúng tôi xây dựng những sản phẩm tuyệt vời.",
    benefits: [
      "Revenue sharing minh bạch",
      "Môi trường làm việc flexible",
      "Công nghệ hiện đại",
      "Cơ hội phát triển cao"
    ],
    gradient: "from-success-500 to-success-600",
    bgGradient: "from-success-50 to-success-100"
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Đối tác đầu tư",
    subtitle: "Đầu tư và mở rộng hệ sinh thái",
    description: "Tìm kiếm cơ hội đầu tư vào lĩnh vực công nghệ marketing? Chúng tôi đang tìm kiếm nhà đầu tư chiến lược.",
    benefits: [
      "ROI hấp dẫn",
      "Thị trường tiềm năng lớn",
      "Đội ngũ kinh nghiệm",
      "Báo cáo minh bạch"
    ],
    gradient: "from-accent-500 to-accent-600",
    bgGradient: "from-accent-50 to-accent-100"
  }
];

const collaborationProcess = [
  {
    step: "01",
    title: "Liên hệ & Trao đổi",
    description: "Liên hệ với chúng tôi để thảo luận về cơ hội hợp tác",
    icon: MessageCircle
  },
  {
    step: "02", 
    title: "Đánh giá & Thương thảo",
    description: "Đánh giá tiềm năng và thương thảo điều kiện hợp tác",
    icon: Target
  },
  {
    step: "03",
    title: "Ký kết hợp đồng",
    description: "Hoàn thiện thủ tục pháp lý và ký kết hợp đồng",
    icon: CheckCircle
  },
  {
    step: "04",
    title: "Bắt đầu hợp tác",
    description: "Triển khai kế hoạch và bắt đầu hợp tác hiệu quả",
    icon: Handshake
  }
];

const stats = [
  { icon: Users, number: "50+", label: "Đối tác tin tưởng" },
  { icon: TrendingUp, number: "200%", label: "Tăng trưởng hàng năm" },
  { icon: Globe, number: "10+", label: "Thành phố hoạt động" },
  { icon: Star, number: "4.9/5", label: "Đánh giá đối tác" }
];

const Collab = () => {
  return (
    <div className="min-h-screen bg-gradient-tech">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-medium mb-6">
              <Handshake className="w-4 h-4" />
              Cơ hội hợp tác chiến lược cùng PLTT
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-secondary-900">Hợp tác</span>{" "}
              <span className="text-gradient">cùng chúng tôi</span>{" "}
              <span className="text-secondary-900">để cùng thành công</span>
            </h1>
            
            <p className="text-xl text-secondary-600 leading-relaxed mb-8">
              Tham gia hệ sinh thái đối tác của PLTT để cùng phát triển và tạo ra 
              giá trị bền vững cho thị trường Landing Page tại Việt Nam
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary group">
                Đăng ký hợp tác ngay
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary group">
                Tải tài liệu hợp tác
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4 mx-auto">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-secondary-900 mb-2">{stat.number}</div>
                <div className="text-sm text-secondary-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Các hình thức hợp tác
            </h2>
            <p className="text-lg text-secondary-600">
              Chúng tôi cung cấp nhiều mô hình hợp tác phù hợp với từng đối tác
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <div 
                key={type.id}
                className={`card card-hover bg-gradient-to-br ${type.bgGradient} border-0 p-8 animate-fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${type.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-secondary-600 mb-4">
                  {type.subtitle}
                </p>
                <p className="text-secondary-700 mb-6">
                  {type.description}
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {type.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                      <span className="text-sm text-secondary-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button className={`btn-primary w-full bg-gradient-to-r ${type.gradient} hover:shadow-lg`}>
                  Tìm hiểu thêm
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Quy trình hợp tác
            </h2>
            <p className="text-lg text-secondary-600">
              4 bước đơn giản để trở thành đối tác của PLTT
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collaborationProcess.map((process, index) => (
              <div key={index} className="text-center relative">
                {/* Step Number */}
                <div className="text-6xl font-bold text-primary-100 mb-4">
                  {process.step}
                </div>
                
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4 mx-auto -mt-12 relative z-10">
                  <process.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-secondary-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-secondary-600">
                  {process.description}
                </p>

                {/* Arrow */}
                {index < collaborationProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-8 h-8 -ml-4">
                    <ArrowRight className="w-6 h-6 text-primary-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Sẵn sàng bắt đầu hợp tác?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Liên hệ với chúng tôi ngay hôm nay để thảo luận về cơ hội hợp tác 
                và cùng xây dựng một tương lai thành công
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Hotline hợp tác</div>
                    <div className="text-primary-100">0902 813 410</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email hợp tác</div>
                    <div className="text-primary-100">partnership@tungmedia.vn</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Thời gian hỗ trợ</div>
                    <div className="text-primary-100">Thứ 2 - Thứ 6: 8:00 - 18:00</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Đăng ký tư vấn hợp tác
              </h3>
              
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Họ và tên *"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Số điện thoại *"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white">
                    <option value="">Chọn hình thức hợp tác</option>
                    <option value="distributor">Đối tác phân phối</option>
                    <option value="technical">Đối tác kỹ thuật</option>
                    <option value="investor">Đối tác đầu tư</option>
                  </select>
                </div>
                <div>
                  <textarea
                    placeholder="Nội dung chi tiết..."
                    rows="4"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white resize-none"
                  ></textarea>
                </div>
                <button className="btn-primary w-full bg-white text-primary-600 hover:bg-primary-50">
                  Gửi thông tin
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collab;