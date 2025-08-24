import { 
  Palette, 
  Zap, 
  Settings, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Star,
  Monitor,
  Smartphone,
  Globe
} from "lucide-react";

const services = [
  {
    id: 1,
    icon: Palette,
    title: "Thiết kế Landing Page",
    subtitle: "Chuyên thiết kế các mẫu giao diện Landing Page mọi lĩnh vực",
    description: "Tạo ra những Landing Page đẹp mắt, chuyên nghiệp với tỷ lệ chuyển đổi cao. Thiết kế responsive, tối ưu UX/UI theo chuẩn quốc tế.",
    features: [
      "Thiết kế responsive trên mọi thiết bị",
      "Tối ưu tỷ lệ chuyển đổi",
      "Giao diện hiện đại, chuyên nghiệp",
      "Tích hợp công cụ analytics"
    ],
    price: "Từ 2.5 triệu",
    timeframe: "1-3 ngày",
    gradient: "from-primary-500 to-primary-600",
    bgGradient: "from-primary-50 to-primary-100"
  },
  {
    id: 2,
    icon: Zap,
    title: "Tối ưu Landing Page",
    subtitle: "Chỉnh sửa và tối ưu Landing Page giúp web load nhanh và chuẩn SEO",
    description: "Nâng cao hiệu suất website với tốc độ tải siêu nhanh, SEO tối ưu và trải nghiệm người dùng tuyệt vời.",
    features: [
      "Tối ưu tốc độ tải trang < 2s",
      "SEO On-page chuẩn Google",
      "Tối ưu Core Web Vitals",
      "A/B Testing cho conversion"
    ],
    price: "Từ 1.5 triệu",
    timeframe: "2-5 ngày",
    gradient: "from-success-500 to-success-600",
    bgGradient: "from-success-50 to-success-100"
  },
  {
    id: 3,
    icon: Settings,
    title: "Quản lý Trang Web",
    subtitle: "Giải pháp quản trị web giúp bạn tiết kiệm thời gian và nhân sự",
    description: "Hệ thống CMS mạnh mẽ giúp bạn quản lý nội dung, đơn hàng và khách hàng một cách dễ dàng và hiệu quả.",
    features: [
      "Dashboard quản lý trực quan",
      "Quản lý nội dung dễ dàng",
      "Báo cáo analytics chi tiết",
      "Backup & bảo mật tự động"
    ],
    price: "Từ 3 triệu",
    timeframe: "5-7 ngày",
    gradient: "from-accent-500 to-accent-600",
    bgGradient: "from-accent-50 to-accent-100"
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Quảng cáo Online",
    subtitle: "Cung cấp trọn gói các dịch vụ quảng cáo giúp bạn gia tăng Doanh Số",
    description: "Chiến lược marketing toàn diện với Google Ads, Facebook Ads và các kênh digital marketing hiệu quả.",
    features: [
      "Chiến lược marketing tổng thể",
      "Google Ads & Facebook Ads",
      "Retargeting & Lookalike",
      "Báo cáo ROI chi tiết"
    ],
    price: "Từ 5 triệu",
    timeframe: "Ongoing",
    gradient: "from-warning-500 to-warning-600",
    bgGradient: "from-warning-50 to-warning-100"
  }
];

const stats = [
  { icon: Users, number: "500+", label: "Khách hàng hài lòng" },
  { icon: Star, number: "98%", label: "Tỷ lệ hoàn thành" },
  { icon: Monitor, number: "1000+", label: "Dự án thành công" },
  { icon: Globe, number: "24/7", label: "Hỗ trợ kỹ thuật" }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-tech">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Dịch vụ chuyên nghiệp được tin tưởng bởi 500+ doanh nghiệp
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-secondary-900">Dịch vụ</span>{" "}
              <span className="text-gradient">Landing Page</span>{" "}
              <span className="text-secondary-900">toàn diện</span>
            </h1>
            
            <p className="text-xl text-secondary-600 leading-relaxed">
              Chúng tôi cung cấp giải pháp Landing Page tối ưu nhất để giúp bạn 
              tối ưu chi phí quảng cáo, gia tăng khách hàng và tăng tỷ lệ chốt đơn cao nhất
            </p>
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

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`card card-hover bg-gradient-to-br ${service.bgGradient} border-0 p-8 animate-fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-secondary-600 mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-secondary-700 mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 gap-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                          <span className="text-sm text-secondary-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price & Timeline */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-sm text-secondary-500">Giá từ</div>
                        <div className="text-lg font-bold text-secondary-900">{service.price}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-secondary-500">Thời gian</div>
                        <div className="text-lg font-bold text-secondary-900">{service.timeframe}</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className={`btn-primary w-full group bg-gradient-to-r ${service.gradient} hover:shadow-lg`}>
                      Tìm hiểu thêm
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Dịch vụ bổ sung
            </h2>
            <p className="text-lg text-secondary-600">
              Chúng tôi cung cấp thêm nhiều dịch vụ khác để hỗ trợ doanh nghiệp của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Monitor,
                title: "Hosting & Domain",
                description: "Dịch vụ hosting tốc độ cao và đăng ký tên miền",
                price: "Từ 500k/năm"
              },
              {
                icon: Smartphone,
                title: "Mobile App",
                description: "Phát triển ứng dụng mobile iOS & Android",
                price: "Từ 50 triệu"
              },
              {
                icon: Settings,
                title: "Maintenance",
                description: "Bảo trì và cập nhật website định kỳ",
                price: "Từ 1 triệu/tháng"
              }
            ].map((item, index) => (
              <div key={index} className="card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mb-4 mx-auto">
                  <item.icon className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">{item.title}</h3>
                <p className="text-secondary-600 mb-4">{item.description}</p>
                <div className="text-primary-600 font-semibold">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu dự án của bạn?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và báo giá chi tiết
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-outline bg-white text-primary-600 hover:bg-primary-50 border-white">
              Tư vấn miễn phí
            </button>
            <button className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
              Xem portfolio
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;