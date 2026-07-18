export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-extrabold">AURA</h1>

      <p className="mt-4 text-xl text-gray-400 text-center max-w-xl">
        AI가 대신 일하는 회사
      </p>

      <p className="mt-2 text-gray-500 text-center">
        콘텐츠 생성 · 자동화 · AI 서비스
      </p>

      <button className="mt-10 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition">
        무료로 시작하기
      </button>
    </main>
  );
}