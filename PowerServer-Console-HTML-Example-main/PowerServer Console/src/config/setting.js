const setting = {
  systemName: 'Server Management Console',        // 系统名称
  defaultTheme: 'dark',           // 默认主题
  themeModel: 'white',            // 主题模式
  themeList: [                    // 菜单主题（选中颜色、hover颜色前往MenuLeft组件修改）
    {
      theme: 'dark',              // 主题名称
      menuLeftBc: '#191A23',      // 背景色
      textColor: '#BABBBD',       // 文字颜色
      activeColor: '#ffffff',     // 文字选中颜色
      iconColor: '#BABBBD',       // 图标颜色
      iconColorActive: '#FFFFFF', // 图标选中颜色
      tabbarBackground: '#FFFFFF' // 顶栏背景色
    },{
      theme: 'white',
      menuLeftBc: '#ffffff',
      textColor: '#515a6e',
      activeColor: '#3296fa',
      iconColor: '#515a6e',
      iconColorActive: '#333333',
      tabbarBackground: '#FFFFFF'
    }
  ],
  menuLeftOpenWidth: '350px',     // 菜单展开的宽度
  menuLeftOpenWidth: '70px',      // 菜单收缩的宽度
  login: {                        // 登录默认账号密码
    username: 'admin',
    password: '123456'
  },
  cryptojs: {                     // 登录密码加密（用于实现密码复杂度）
    key: "1234123412ABCDEF",
    iv: "ABCDEF1234123412"
  }
}

export default setting;
