<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LessonsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$modules = DB::table('modules')->select('id', 'title')->get();

		if ($modules->isEmpty()) {
			$this->command?->warn('No modules found. Skipping LessonsSeeder.');
			return;
		}

		$allLessons = [];

		foreach ($modules as $module) {
			$baseTitle = $module->title;
			$lessonsForModule = [
				[
					'title' => $baseTitle.' - Overview',
					'objective' => 'Understand the core concepts of '.$baseTitle.'.',
					'content' => '<p>This comprehensive lesson introduces you to the fundamental concepts, scope, and expected outcomes related to '.$baseTitle.'.</p>
<p>Youth health and wellbeing are crucial aspects of development that empower young people to make informed decisions about their bodies, relationships, and futures.</p>
<p>Throughout this module, you will gain essential knowledge about key topics such as mental health, nutrition, healthy relationships, and sexual and reproductive health (SRHR).</p>
<p>Understanding these concepts is vital for making responsible choices that align with your personal circumstances, health status, and life goals.</p>
<p>This lesson will cover the basic principles of youth health, the importance of SRHR, and how they contribute to overall well-being and quality of life.</p>
<p>We will explore the social, economic, and health benefits of prioritizing youth wellbeing, including improved educational, social, and health outcomes.</p>
<p>By the end of this overview, you will have a solid foundation to build upon as we delve deeper into specific topics and practices in subsequent lessons.</p>
<p>Remember, making informed decisions about your health requires understanding your options and consulting with trusted professionals who can provide personalized guidance.</p>
<p>This educational content aims to provide you with accurate, evidence-based information to support your decision-making process.</p>
<p>Let\'s begin this journey towards better youth health awareness and empowered choices.</p>',
					'pdf_url' => null,
					'video_url' => null,
					'order' => 1,
					'is_active' => true,
				],
				[
					'title' => $baseTitle.' - Key Methods & Usage',
					'objective' => 'Identify and compare main approaches related to '.$baseTitle.'.',
					'content' => '<p>This lesson provides a comprehensive deep dive into practical actions, decision factors, and real-world considerations for '.$baseTitle.'.</p>
<p>There are various supports and services available to promote youth health, each with unique characteristics, benefits, and suitability for different individuals and life circumstances.</p>
<p>These may include youth-friendly health services, counselling, peer-support groups, and information centers that provide accurate SRHR and general health information.</p>
<p>Community resources, such as youth centers and safe spaces, can also offer opportunities for learning, mentorship, and skills-building.</p>
<p>When choosing where to seek support, consider factors such as trust, confidentiality, accessibility, cost, and whether the service respects your rights and dignity.</p>
<p>It is essential to consult with qualified professionals who can assess your situation, discuss options, and help you select the most appropriate support.</p>
<p>Regular check-ins about your physical and mental health are crucial for maintaining wellbeing and addressing any concerns early.</p>',
					'pdf_url' => null,
					'video_url' => null,
					'order' => 2,
					'is_active' => true,
				],
				[
					'title' => $baseTitle.' - Safety, Myths, and FAQs',
					'objective' => 'Address safety, common misconceptions, and frequently asked questions.',
					'content' => '<p>This lesson reviews essential safety guidance, addresses common myths and misconceptions, and clarifies frequently asked questions about '.$baseTitle.'.</p>
<p>Safety is paramount when it comes to youth health and SRHR, and understanding potential risks, protections, and support options is crucial for your well-being.</p>
<p>Common myths include misconceptions about puberty, menstruation, fertility, and mental health that can cause fear or shame if not corrected.</p>
<p>It is important to know that many concerns can be safely managed with accurate information and support from trained professionals.</p>
<p>Reactions to stress, body changes, and social pressure vary by individual, and seeking help early can prevent long-term challenges.</p>
<p>Certain medical conditions, medications, or lifestyle factors may influence which services or supports are appropriate for you, highlighting the importance of consultation.</p>
<p>Frequently asked questions often concern confidentiality, where to get youth-friendly services, and how to speak with trusted adults about sensitive topics.</p>
<p>Understanding your rights to information, respect, and confidential care helps set realistic expectations about services and support.</p>
<p>Remember that reliable information from credible sources and healthcare providers is essential for making safe, informed decisions about your health.</p>',
					'pdf_url' => null,
					'video_url' => null,
					'order' => 3,
					'is_active' => true,
				],
			];

			$now = Carbon::now();
			foreach ($lessonsForModule as $lesson) {
				$allLessons[] = [
					'module_id' => $module->id,
					'title' => $lesson['title'],
					'objective' => $lesson['objective'],
					'content' => $lesson['content'],
					'pdf_url' => $lesson['pdf_url'],
					'video_url' => $lesson['video_url'],
					'order' => $lesson['order'],
					'is_active' => $lesson['is_active'],
					'created_at' => $now,
					'updated_at' => $now,
				];
			}
		}

		if (!empty($allLessons)) {
			DB::table('lessons')->insert($allLessons);
		}
	}
}


