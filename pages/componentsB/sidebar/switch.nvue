<template>
    <view class="u-page">
        <view class="u-demo-block">
            <view class="u-demo-block__content">
                <view class="switch-container">
                        <u-sidebar v-model="active" :showLine="false" @change="handleChange">
                         <u-sidebar-item 
                             v-for="(item, index) in pages" 
                             :key="index" 
                             :value="index" 
                             :label="item.label" 
                             :icon="item.icon"
                             :iconSize="24"
                             iconPosition="top"
                             :iconColor="active === index ? '#1677ff' : '#666'"
                         />
                     </u-sidebar>
                    
                    <view class="content-area">
                        <view class="page-content">
                            <view class="page-header">
                                <text class="page-title">{{ currentPage.title }}</text>
                                <text class="page-desc">{{ currentPage.description }}</text>
                            </view>
                            
                            <view class="page-body">
                                <!-- 首页 -->
                                <view v-if="active === 0" class="home-page">
                                    <view class="welcome-card">
                                        <text class="welcome-title">欢迎使用系统</text>
                                        <text class="welcome-subtitle">这是一个功能强大的管理系统</text>
                                    </view>
                                    <view class="feature-grid">
                                        <view class="feature-item" v-for="(feature, index) in features" :key="index">
                                            <text class="feature-icon">{{ feature.icon }}</text>
                                            <text class="feature-name">{{ feature.name }}</text>
                                            <text class="feature-desc">{{ feature.desc }}</text>
                                        </view>
                                    </view>
                                </view>
                                
                                <!-- 用户页面 -->
                                <view v-if="active === 1" class="user-page">
                                    <view class="user-list">
                                        <view class="user-item" v-for="(user, index) in users" :key="index">
                                            <view class="user-avatar">{{ user.avatar }}</view>
                                            <view class="user-info">
                                                <text class="user-name">{{ user.name }}</text>
                                                <text class="user-role">{{ user.role }}</text>
                                            </view>
                                            <view class="user-status" :class="user.status">
                                                {{ user.statusText }}
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                
                                <!-- 设置页面 -->
                                <view v-if="active === 2" class="setting-page">
                                    <view class="setting-group">
                                        <view class="setting-item">
                                            <text class="setting-label">主题模式</text>
                                            <view class="setting-control">
                                                <text class="setting-value">深色模式</text>
                                            </view>
                                        </view>
                                        <view class="setting-item">
                                            <text class="setting-label">语言设置</text>
                                            <view class="setting-control">
                                                <text class="setting-value">简体中文</text>
                                            </view>
                                        </view>
                                        <view class="setting-item">
                                            <text class="setting-label">通知提醒</text>
                                            <view class="setting-control">
                                                <text class="setting-value">开启</text>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                
                                <!-- 统计页面 -->
                                <view v-if="active === 3" class="stats-page">
                                    <view class="stats-grid">
                                        <view class="stats-card">
                                            <text class="stats-number">1,234</text>
                                            <text class="stats-label">总用户数</text>
                                        </view>
                                        <view class="stats-card">
                                            <text class="stats-number">567</text>
                                            <text class="stats-label">活跃用户</text>
                                        </view>
                                        <view class="stats-card">
                                            <text class="stats-number">89</text>
                                            <text class="stats-label">今日新增</text>
                                        </view>
                                        <view class="stats-card">
                                            <text class="stats-number">98.5%</text>
                                            <text class="stats-label">系统可用性</text>
                                        </view>
                                    </view>
                                </view>
                                
                                <!-- 帮助页面 -->
                                <view v-if="active === 4" class="help-page">
                                    <view class="help-section">
                                        <text class="help-title">常见问题</text>
                                        <view class="help-item" v-for="(item, index) in faqs" :key="index">
                                            <text class="help-question">{{ item.question }}</text>
                                            <text class="help-answer">{{ item.answer }}</text>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                                 pages: [
                     {
                         label: '首页',
                         title: '欢迎页面',
                         description: '这是应用的首页，展示主要功能',
                         icon: 'home'
                     },
                     {
                         label: '用户',
                         title: '用户管理',
                         description: '管理系统用户信息',
                         icon: 'account'
                     },
                     {
                         label: '设置',
                         title: '系统设置',
                         description: '配置系统参数和偏好',
                         icon: 'setting'
                     },
                     {
                         label: '统计',
                         title: '数据统计',
                         description: '查看系统运行数据',
                         icon: 'list'
                     },
                     {
                         label: '帮助',
                         title: '帮助中心',
                         description: '获取使用帮助和支持',
                         icon: 'question-circle'
                     }
                 ],
                // 首页功能特性数据
                features: [
                    { icon: '🏠', name: '首页', desc: '快速访问主要功能' },
                    { icon: '👥', name: '用户', desc: '管理用户信息' },
                    { icon: '⚙️', name: '设置', desc: '系统配置' },
                    { icon: '📊', name: '统计', desc: '数据报表' }
                ],
                // 用户数据
                users: [
                    { avatar: '👤', name: '张三', role: '管理员', status: 'active', statusText: '在线' },
                    { avatar: '👤', name: '李四', role: '编辑', status: 'offline', statusText: '离线' },
                    { avatar: '👤', name: '王五', role: '用户', status: 'active', statusText: '在线' },
                    { avatar: '👤', name: '赵六', role: '访客', status: 'inactive', statusText: '禁用' }
                ],
                // 帮助数据
                faqs: [
                    { question: '如何修改密码？', answer: '在设置页面点击"安全设置"即可修改密码。' },
                    { question: '忘记密码怎么办？', answer: '请联系系统管理员重置密码。' },
                    { question: '如何导出数据？', answer: '在相应页面点击"导出"按钮即可下载数据。' }
                ]
            };
        },
        computed: {
            currentPage() {
                return this.pages[this.active] || this.pages[0];
            }
        },
                methods: {
            handleChange({ index, label, value }) {
                this.active = index;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .u-page {
        background-color: #f5f5f5;
        padding: 0;
    }

    .u-demo-block__content {
        background-color: #fff;
        height: 600px;
    }

    .switch-container {
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    .content-area {
        flex: 1;
        background: #fff;
        height: 100%;
        overflow: hidden;
    }

    .page-content {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .page-header {
        padding: 20px;
        border-bottom: 1px solid #f0f0f0;
        background: #fafafa;
    }

    .page-title {
        display: block;
        font-size: 20px;
        font-weight: bold;
        color: #333;
        margin-bottom: 8px;
    }

    .page-desc {
        display: block;
        font-size: 14px;
        color: #666;
    }

    .page-body {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
    }

    // 首页样式
    .home-page {
        .welcome-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 30px;
        }

        .welcome-title {
            display: block;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .welcome-subtitle {
            display: block;
            font-size: 16px;
            opacity: 0.9;
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        .feature-item {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e9ecef;
        }

        .feature-icon {
            display: block;
            font-size: 32px;
            margin-bottom: 10px;
        }

        .feature-name {
            display: block;
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }

        .feature-desc {
            display: block;
            font-size: 12px;
            color: #666;
        }
    }

    // 用户页面样式
    .user-page {
        .user-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .user-item {
            display: flex;
            align-items: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }

        .user-avatar {
            font-size: 24px;
            margin-right: 15px;
        }

        .user-info {
            flex: 1;
        }

        .user-name {
            display: block;
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }

        .user-role {
            display: block;
            font-size: 12px;
            color: #666;
        }

        .user-status {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            color: white;

            &.active {
                background: #28a745;
            }

            &.offline {
                background: #6c757d;
            }

            &.inactive {
                background: #dc3545;
            }
        }
    }

    // 设置页面样式
    .setting-page {
        .setting-group {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }

        .setting-label {
            font-size: 16px;
            color: #333;
        }

        .setting-value {
            font-size: 14px;
            color: #666;
        }
    }

    // 统计页面样式
    .stats-page {
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        .stats-card {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e9ecef;
        }

        .stats-number {
            display: block;
            font-size: 28px;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 8px;
        }

        .stats-label {
            display: block;
            font-size: 14px;
            color: #666;
        }
    }

    // 帮助页面样式
    .help-page {
        .help-section {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .help-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
        }

        .help-item {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }

        .help-question {
            display: block;
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }

        .help-answer {
            display: block;
            font-size: 14px;
            color: #666;
            line-height: 1.5;
        }
    }
</style>
