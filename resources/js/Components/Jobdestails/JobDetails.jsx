import { CheckCircle } from "lucide-react"; // Lucide icons

const JobDetails = ({ job }) => {
    // Vérifier si job est chargé
    if (!job) return <p>Loading...</p>;

    console.log(job);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
                {/* Left Section (Main Content) */}
                <div className="col-span-2">
                    <h2 className="text-2xl font-semibold">{job.titre}</h2>
                    <p className="text-gray-600">{job.description}</p>

                    {/* Responsibilities */}
                    <h3 className="text-xl font-semibold mt-6">
                        Responsibilities
                    </h3>
                    <ul className="list-none space-y-2 text-gray-600">
                        {job.responsabilites.map((item, index) => (
                            <li key={index} className="flex items-center">
                                <CheckCircle
                                    className="text-green-500 mr-2"
                                    size={16}
                                />
                                {item.designation}
                            </li>
                        ))}
                    </ul>

                    {/* Who You Are */}
                    <h3 className="text-xl font-semibold mt-6">Who You Are</h3>
                    <ul className="list-none space-y-2 text-gray-600">
                        {job.exigences.map((item, index) => (
                            <li key={index} className="flex items-center">
                                <CheckCircle
                                    className="text-green-500 mr-2"
                                    size={16}
                                />
                                {item.designation}
                            </li>
                        ))}
                    </ul>

                    {/* Nice-To-Haves */}
                    <h3 className="text-xl font-semibold mt-6">
                        Nice-To-Haves
                    </h3>
                    <ul className="list-none space-y-2 text-gray-600">
                        {job.preferences.map((item, index) => (
                            <li key={index} className="flex items-center">
                                <CheckCircle
                                    className="text-green-500 mr-2"
                                    size={16}
                                />
                                {item.designation}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Sidebar Section */}
                <div className=" p-6 rounded-lg ">
                    <h3 className="text-2xl text-gray-500 mb-5 font-bold">
                        About this role
                    </h3>
                    <div className="mt-2 bg-slate-100 rounded p-2">
                        <p className="text-gray-600">
                            <span className="font-semibold">
                                {job.salaire}
                            </span>{" "}
                            - {job.type_travail}
                        </p>
                        <div className="w-full bg-gray-300 h-2 rounded-full mt-1">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                // Style dynamique ici si nécessaire
                            ></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="mt-3 ">
                            <span className="text-gray-400 font-light">
                                Apply Before:
                            </span>{" "}
                            {new Date(job.date_fin).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="text-gray-400 font-light">
                                Job Posted On:
                            </span>{" "}
                            {new Date(job.date_publication).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="text-gray-400 font-light">
                                Job Type:
                            </span>{" "}
                            {job.type_travail}
                        </p>
                        <p>
                            <span className="text-gray-400 font-light">
                                Salary:
                            </span>{" "}
                            {job.salaire}
                        </p>
                    </div>

                    <div className="mt-4 bg-slate-100 rounded p-2"></div>

                    {/* Categories */}
                    <h3 className="text-xl font-semibold mt-4 mb-4">
                        Categories
                    </h3>
                    <div className="flex flex-wrap mt-2 ">
                        {/* Affichage dynamique des catégories */}
                        <span
                            className="bg-yellow-200 text-yellow-800 px-2 py-1 text-sm rounded mr-2"
                        >
                            {job.categorie.designation}
                        </span>
                    </div>

                    <div className="mt-4 bg-slate-100 rounded p-2"></div>

                    {/* Required Skills */}
                    <h3 className="text-xl font-semibold mt-6">
                        Required Skills
                    </h3>
                    <div className="flex flex-wrap m mt-2">
                        {job.competences.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 m-1 text-red-800 px-2 py-1 text-sm rounded mr-2"
                            >
                                {skill.designation}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDetails;
