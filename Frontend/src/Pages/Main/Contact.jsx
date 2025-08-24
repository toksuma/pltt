import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  Star,
  CheckCircle,
  Globe,
  Facebook,
  Youtube,
  Zap
} from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Địa chỉ văn phòng",
    content: "613 Đ. Âu Cơ, Phú Trung, Tân Phú, TP.HCM",
    gradient: "from-primary-500 to-primary-600",
    bgGradient: "from-primary-50 to-primary-100"
  },
  {
    icon: Phone,
    title: "Hotline hỗ trợ",
    content: "0902 813 410",
    gradient: "from-success-500 to-success-600",
    bgGradient: "from-success-50 to-success-100"
  },
  {
    icon: Mail,
    title: "Email liên hệ",
    content: "support@tungmedia.vn",
    gradient: "from-accent-500 to-accent-600",
    bgGradient: "from-accent-50 to-accent-100"
  },
  {
    icon: Clock,
    title: "Thời gian làm việc",
    content: "Thứ 2 - Thứ 6: 8:00 - 18:00",
    gradient: "from-warning-500 to-warning-600",
    bgGradient: "from-warning-50 to-warning-100"
  }
];

const socialLinks = [
  {
    icon: Facebook,
    name: "Facebook",
    url: "https://facebook.com/tungmedia",
    color: "text-blue-600"
  },
  {
    icon: Youtube,
    name: "YouTube", 
    url: "https://youtube.com/tungmedia",
    color: "text-red-600"
  },
  {
    icon: MessageCircle,
    name: "Zalo",
    url: "https://zalo.me/0902813410",
    color: "text-blue-500"
  },
  {
    icon: Globe,
    name: "Website",
    url: "https://tungmedia.vn",
    color: "text-gray-600"
  }
];

const faqs = [
  {
    question: "Thời gian phản hồi liên hệ là bao lâu?",
    answer: "Chúng tôi cam kết phản hồi trong vòng 2 giờ làm việc. Đối với các trường hợp khẩn cấp, vui lòng gọi trực tiếp hotline."
  },
  {
    question: "Có hỗ trợ tư vấn miễn phí không?",
    answer: "Có, chúng tôi cung cấp tư vấn miễn phí 30 phút đầu để hiểu rõ nhu cầu và đưa ra giải pháp phù hợp."
  },
  {
    question: "Làm việc ngoài giờ hành chính được không?",
    answer: "Chúng tôi linh hoạt sắp xếp lịch họp ngoài giờ hành chính cho các dự án quan trọng hoặc khách hàng VIP."
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    // Reset form or show success message
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 2 giờ.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-tech">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              Hỗ trợ khách hàng 24/7 - Phản hồi trong 2 giờ
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-secondary-900">Liên hệ</span>{" "}
              <span className="text-gradient">với chúng tôi</span>
            </h1>
            
            <p className="text-xl text-secondary-600 leading-relaxed">
              Sẵn sàng hỗ trợ bạn 24/7. Liên hệ ngay để được tư vấn miễn phí 
              và nhận báo giá chi tiết cho dự án của bạn.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className={`card card-hover bg-gradient-to-br ${info.bgGradient} border-0 p-6 text-center animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${info.gradient} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-secondary-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-secondary-700 font-medium">
                  {info.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                  Gửi tin nhắn cho chúng tôi
                </h2>
                <p className="text-secondary-600">
                  Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại trong vòng 2 giờ làm việc.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="0123 456 789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Dịch vụ quan tâm
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Chọn dịch vụ</option>
                      <option value="landing-page">Thiết kế Landing Page</option>
                      <option value="optimization">Tối ưu Landing Page</option>
                      <option value="management">Quản lý trang web</option>
                      <option value="advertising">Quảng cáo online</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Nội dung tin nhắn *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                    placeholder="Mô tả chi tiết về dự án hoặc câu hỏi của bạn..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      Gửi tin nhắn
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              
              {/* Office Info */}
              <div className="card">
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                  Thông tin văn phòng
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary-900">Địa chỉ</div>
                      <div className="text-secondary-600">613 Đ. Âu Cơ, Phú Trung, Tân Phú, TP.HCM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-success-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary-900">Hotline</div>
                      <div className="text-secondary-600">0902 813 410</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-accent-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary-900">Email</div>
                      <div className="text-secondary-600">support@tungmedia.vn</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-warning-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary-900">Giờ làm việc</div>
                      <div className="text-secondary-600">Thứ 2 - Thứ 6: 8:00 - 18:00</div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <div className="font-semibold text-secondary-900 mb-4">Kết nối với chúng tôi</div>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-secondary-100 hover:bg-secondary-200 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <social.icon className={`w-5 h-5 ${social.color}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="card">
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                  Câu hỏi thường gặp
                </h3>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-secondary-200 pb-4 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-secondary-900 mb-2">{faq.question}</div>
                          <div className="text-secondary-600 text-sm">{faq.answer}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96">
        <iframe
          title="Bản đồ văn phòng PLTT"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0!2d106.627!3d10.804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ4JzE0LjQiTiAxMDbCsDM3JzM3LjIiRQ!5e0!3m2!1svi!2s!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Cần hỗ trợ khẩn cấp?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Gọi ngay hotline để được hỗ trợ trực tiếp từ chuyên gia của chúng tôi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0902813410" 
              className="btn-outline bg-white text-primary-600 hover:bg-primary-50 border-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Gọi ngay: 0902 813 410
            </a>
            <a
              href="https://zalo.me/0902813410"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-primary-600 hover:bg-primary-50"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Zalo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;