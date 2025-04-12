import { Link } from '@inertiajs/react';

const CompaniesList = ({ entreprises }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {entreprises.length === 0 ? (
                <div className="col-span-2 bg-white border rounded-xl shadow-sm p-5 text-center">
                    <p className="text-gray-500">No companies found matching your criteria.</p>
                </div>
            ) : (
                entreprises.map((entreprise) => (
                    <div key={entreprise.id} className="bg-white border rounded-xl shadow-sm p-5 flex flex-col">
                        {/* Logo & Job Count */}
                        <div className="flex justify-between items-start">
                        
                            <img 
                                src={entreprise.logo ? `/storage/${entreprise.logo}` : '/images/logos/Stripe.jpg'} 
                                alt={entreprise.nom} 
                                className="w-12 h-12 rounded-md object-cover"
                            />
                            {entreprise.offres_emplois_count
                                && (
                                <span className="bg-red-100 text-red-500 text-sm font-semibold px-2 py-1 rounded-md">
                                    {entreprise.offres_emplois_count} Jobs
                                </span>
                            )}
                        </div>

                        {/* Company Name & Description */}
                        <h3 className="text-lg font-bold mt-3">{entreprise.nom}</h3>
                        <p className="text-gray-600 mt-2 line-clamp-2">{entreprise.description}</p>
                        
                        {/* Location */}
                        {entreprise.canton && (
                            <p className="text-gray-500 mt-2 text-sm">
                                {entreprise.locations}, {entreprise.canton.nom}
                            </p>
                        )}
                        
                        {/* Domain Category */}
                        {entreprise.domaine && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                                    {entreprise.domaine.designation}
                                </span>
                            </div>
                        )}

                        {/* Link to company details */}
                        <Link 
                            href={route('entreprises.show', entreprise.id)} 
                            className="mt-4 text-red-500 font-semibold text-sm hover:underline"
                        >
                            View details →
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default CompaniesList;