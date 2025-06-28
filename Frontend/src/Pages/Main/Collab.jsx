const Collab = () => (
  <div className="bg-white py-12 px-6">
    <h1 className="text-4xl font-bold text-center text-[#d3046c] mb-10">
      HỢP TÁC THIẾT KẾ LANDING PAGE
    </h1>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div className="text-gray-800 text-lg leading-relaxed">
        <h2>
          Xin chào bạn, Nếu bạn đang như cầu sau thì hãy nhanh tay liên hệ ngay với chúng tôi để hợp tác bạn nhé:
          <br /><br />
          <strong>1.</strong> Bạn đang có hệ thống giải pháp giúp thiết kế các trang <strong>LANDING PAGE</strong> nhanh gọn và đang tìm các bên để phân phối tiếp thị tới khách hàng
          <br /><br />
          <strong>2.</strong> Bạn đang muốn học hỏi để có thể tự biết thiết kế landing page hoặc muốn tìm việc làm thiết kế trang landing page online
          <br /><br />
          <strong>VẬY</strong> thì bạn đã tìm đúng nơi để hợp tác rồi, chúng tôi sẵn sàng hợp tác cùng bạn để đôi bên cùng <strong>Win Win</strong>
          <br /><br />
          Nếu bạn đang có nhu cầu hãy liên hệ ngay để chúng ta cùng trao đổi chi tiết bạn nhé.
        </h2>
        <div className="mt-6 flex justify-center">
          <button className="text-white hover:text-[#d3046c] text-lg font-semibold px-6 py-3 rounded-full shadow bg-[#fd9374] transition duration-300 transform hover:scale-105">
            Hotline/Zalo: 0123456789
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src="/cb.png"
          alt="Collaboration"
          className="max-w-full h-auto rounded-lg"
        />
      </div>
    </div>
  </div>
);

export default Collab;