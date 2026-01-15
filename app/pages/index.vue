<script lang="ts" setup>
const { data: tasks, error, status } = await useFetch("/api/tasks", { lazy: true });
</script>

<template>
	<div>
		<div v-if="status === 'pending'">
			<div aria-busy="true">
				Loading ...
			</div>
		</div>
		<div v-else-if="error">
			Error: {{ error.statusMessage }}
		</div>
		<div v-else>
			<div
				v-for="task in tasks"
				:key="task.id"
				class="card card-border bg-base-100 w-96"
			>
				<div class="card-body">
					<h2 class="card-title">
						{{ task.title }}
					</h2>
					<p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">
							Buy Now
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
