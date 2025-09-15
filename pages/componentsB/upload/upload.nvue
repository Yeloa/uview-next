<template>
	<view class="u-page">
		<card title="基础用法">
			<u-upload
				v-model="fileList11"
				action="https://uview.d3u.cn/upload.php"
				name="file"
			></u-upload>

			<view class="fileList">
				<view>文件列表</view>
				{{ fileList11 }}
			</view>
		</card>
		<card title="自定义上传">
			<u-upload
				v-model="fileList12"
				@afterRead="afterRead1"
				name="file"
				multiple
				:maxCount="2"
			></u-upload>

			<view class="fileList">
				<view>文件列表</view>
				<view v-for="(item,index) in fileList12" :key="index">
					{{ item }}
				</view>
			</view>
		</card>
		
		<card title="上传视频">
			<u-upload
				:fileList="fileList2"
				@afterRead="afterRead"
				@delete="deletePic"
				name="2"
				multiple
				:maxCount="10"
				accept="video"
			></u-upload>
		</card>
		
		<card title="文件预览">
			<u-upload
				:fileList="fileList3"
				@afterRead="afterRead"
				@delete="deletePic"
				name="3"
				multiple
				:maxCount="10"
				:previewFullImage="true"
			></u-upload>
		</card>
		
		<card title="隐藏上传按钮">
			<u-upload
				:fileList="fileList4"
				@afterRead="afterRead"
				@delete="deletePic"
				name="4"
				multiple
				:maxCount="2"
			></u-upload>
		</card>
		
		<card title="限制上传数量">
			<u-upload
				:fileList="fileList5"
				@afterRead="afterRead"
				@delete="deletePic"
				name="5"
				multiple
				:maxCount="3"
			></u-upload>
		</card>
		
		<card title="自定义上传样式">
			<u-upload
				:fileList="fileList6"
				@afterRead="afterRead"
				@delete="deletePic"
				name="6"
				multiple
				:maxCount="1"
				width="250"
				height="150"
			>
				<image src="http://uview.d3u.cn/web/static/uview/demo/upload/positive.png" mode="widthFix" style="width: 250px;height: 150px;"></image>
			</u-upload>
		</card>
	</view>
</template>

<script>
	import { uploadFile } from '@/common/api'
	export default {
		data() {
			return {
				fileList11: 'https://uview.d3u.cn/web/static/uview/album/1.jpg',
				fileList12: [],
				fileList1: [],
				fileList2: [],
				fileList3: [{
					url: 'https://uview.d3u.cn/web/static/uview/album/1.jpg',
				}],
				fileList4: [{
						url: 'https://uview.d3u.cn/web/static/uview/album/1.jpg',
					},
					{
						url: 'https://uview.d3u.cn/web/static/uview/album/1.jpg',
					}
				],
				fileList5: [],
				fileList6: [],
				fileList7: []
			}
		},
		onLoad() {
		},
		methods: {
			async afterRead1(event){
				for (let i = 0; i < event.file.length; i++) {
					const { data } = await uploadFile({
						filePath: event.file[i].url,
						name: event.name,
					});
					this.fileList12.push(data.data.url)
				}
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://uview.d3u.cn/upload.php', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							let data = JSON.parse(res.data)
							console.log(data)
							resolve(data.data.url)
						}
					});
				})
			},
		},
	}
</script>

<style scoped>	
.fileList{
	margin-top: 10px;
	font-size: 12px;
	color: #888;
}
</style>