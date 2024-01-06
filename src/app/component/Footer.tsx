import React from 'react'

function Footer() {
    var current_date = new Date();
    var current_year = current_date.getFullYear();
      return (
    <footer className="footer footer-center p-4 mt-5 bg-[#FAFBF4] text-base-content">
  <aside>
    <p>Copyright © {current_year} - All right reserved <span className="text-[#00A0F3]">by AI Team</span> </p>
  </aside>
</footer>
  )
}

export default Footer