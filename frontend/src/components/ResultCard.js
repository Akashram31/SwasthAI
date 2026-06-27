import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const riskBannerClasses = {
  Low: "bg-emerald-50 border-emerald-300 text-emerald-800",
  Moderate: "bg-amber-50 border-amber-300 text-amber-800",
  High: "bg-red-50 border-red-300 text-red-800",
};

function ResultCard({ assessment }) {
  const bannerClass =
    riskBannerClasses[assessment?.riskLevel] || riskBannerClasses.High;
  const featureNames = {
  BMI: "BMI",
  Age: "Age",
  GenHlth: "General Health",
  DiffWalk: "Difficulty Walking",
  PhysActivity: "Physical Activity",
  Smoker: "Smoking",
  Fruits: "Fruit Intake",
  Veggies: "Vegetable Intake",
  HvyAlcoholConsump: "Alcohol Consumption",
  Sex: "Gender",
  };

  const shapData = (assessment?.shapFactors || []).map((item) => ({
  name: featureNames[item.feature] || item.feature,
  impact: Math.abs(item.contribution),
  }));

  const recommendations = assessment?.recommendations || [];

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        {/* Risk Banner */}
        <div
          className={`border rounded-lg text-center py-4 px-4 ${bannerClass}`}
        >
          <h2 className="text-2xl font-bold">
            Diabetes Risk Level:{" "}
            <span>{assessment?.riskLevel || "N/A"}</span>
          </h2>

          <h4 className="text-lg mt-2">
            Risk Probability:{" "}
            <strong>{assessment?.riskProbability ?? 0}%</strong>
          </h4>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Health Summary */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-3">
              📋 Your Health Summary
            </h5>

            <table className="w-full text-left">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-2 font-semibold text-slate-600">Age</td>
                  <td className="py-2">
                    {assessment?.age ?? "N/A"}
                    {assessment?.age ? " years" : ""}
                  </td>
                </tr>

                <tr className="border-b border-slate-200">
                  <td className="py-2 font-semibold text-slate-600">
                    Gender
                  </td>
                  <td className="py-2">
                    {assessment?.gender ?? "N/A"}
                  </td>
                </tr>

                <tr className="border-b border-slate-200">
                  <td className="py-2 font-semibold text-slate-600">
                    Height
                  </td>
                  <td className="py-2">
                    {assessment?.height ?? "N/A"}
                    {assessment?.height ? " cm" : ""}
                  </td>
                </tr>

                <tr className="border-b border-slate-200">
                  <td className="py-2 font-semibold text-slate-600">
                    Weight
                  </td>
                  <td className="py-2">
                    {assessment?.weight ?? "N/A"}
                    {assessment?.weight ? " kg" : ""}
                  </td>
                </tr>

                <tr className="border-b border-slate-200">
                  <td className="py-2 font-semibold text-slate-600">BMI</td>
                  <td className="py-2">
                    {assessment?.bmi ?? "N/A"}
                  </td>
                </tr>

                <tr className="border-b border-slate-200">
                  <td className="py-2 font-semibold text-slate-600">
                    Smoking
                  </td>
                  <td className="py-2">
                    {assessment?.smoking === 1 ||
                    assessment?.smoking === true
                      ? "Yes"
                      : "No"}
                  </td>
                </tr>

                <tr className="border-b border-slate-200">
                  <td className="py-2 font-semibold text-slate-600">
                    Alcohol
                  </td>
                  <td className="py-2">
                    {assessment?.alcohol === 1 ||
                    assessment?.alcohol === true
                      ? "Yes"
                      : "No"}
                  </td>
                </tr>

                <tr>
                  <td className="py-2 font-semibold text-slate-600">
                    Physical Activity
                  </td>
                  <td className="py-2">
                    {assessment?.physicalActivity === 1 ||
                    assessment?.physicalActivity === true
                      ? "Yes"
                      : "No"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SHAP Chart */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">
              🔍 Key Factors Affecting Your Risk (SHAP)
            </h5>

            <p className="text-slate-500 text-sm mb-3">
              This chart shows which factors contributed most to your diabetes
              risk prediction.
            </p>

            {shapData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={shapData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    angle={-30}
                    textAnchor="end"
                    height={60}
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="impact"
                    fill="#1e5fce"
                    name="Impact Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-500 text-center py-20">
                SHAP explanation not available.
              </p>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 mt-6">
          <h5 className="font-semibold text-slate-800 mb-3">
            💡 Personalized Recommendations
          </h5>

          {recommendations.length > 0 ? (
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="bg-sky-50 border border-sky-200 text-sky-800 rounded-md px-3 py-2 text-sm"
                >
                  ✅ {rec}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">
              No recommendations available.
            </p>
          )}
        </div>

        <p className="text-slate-500 text-sm mt-5 text-center">
          ⚠️ Note: SwasthAI provides risk assessment only, not medical
          diagnosis. Always consult a healthcare professional for medical
          advice.
        </p>
      </div>
    </div>
  );
}

export default ResultCard;